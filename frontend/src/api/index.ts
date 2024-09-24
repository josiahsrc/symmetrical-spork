import { getBaseUrl } from "../utils/env";

const buildUrl = (path: string) => {
  return `${getBaseUrl()}${path}`;
}

type SuccessResult<R> = { type: "success"; data: R };
type ErrorResult = { type: "error"; message: string };
export type Result<R> = SuccessResult<R> | ErrorResult;

async function handleResponse<R>(response: Response): Promise<Result<R>> {
  if (!response.ok) {
    const error = await response.json();
    return { type: "error", message: error.message };
  }

  const data = (await response.json()) as R;
  console.log("result", data);
  return { type: "success", data };
}

export type CreateSlugOutput = {
  slug: string;
}

export const createSlug = async (url: string) => {
  console.log("URL", buildUrl("/create"));
  const result = await fetch(
    buildUrl("/create"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }
  );

  return await handleResponse<CreateSlugOutput>(result);
}

export type GetUrlOutput = {
  url: string;
}

export const getUrl = async (slug: string) => {
  const result = await fetch(buildUrl(`/${slug}`), {
    method: "GET",
  });
  return await handleResponse<GetUrlOutput>(result);
}