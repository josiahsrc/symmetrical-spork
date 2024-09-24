import express from "express";

/** Thrown when the client did something wrong */
export class ClientError extends Error { }

/** Thrown when the requested resource is not found */
export class NotFoundError extends Error { }

/**
 * Standardize the response handling for all API calls. Intended to be used
 * by the communication layer to handle errors and responses.
 */
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