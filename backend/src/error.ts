import express from "express";

export class ClientError extends Error { }

export class NotFoundError extends Error { }

export async function wrap<I = unknown, O = unknown>(
  req: express.Request,
  res: express.Response,
  fn: (body: I) => Promise<O>
) {
  try {
    const out = await fn(req.body as I);
    res.send(out || { status: "ok" });
  } catch (e) {
    if (e instanceof ClientError) {
      console.info(e);
      res.status(400).send({ message: e.message });
    } else if (e instanceof NotFoundError) {
      console.info(e);
      res.status(404).send({ message: e.message });
    } else {
      console.error(e);
      res.status(500).send({ message: `internal server error: ${e}` });
    }
  }
}