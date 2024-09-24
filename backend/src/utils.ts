export const isValidHttpUrl = (url: string): boolean => {
  let urlObj: URL;
  try {
    urlObj = new URL(url);
  } catch {
    return false;
  }

  return urlObj.protocol === "http:" || urlObj.protocol === "https:";
}
