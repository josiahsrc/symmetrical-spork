import express from "express";
import { wrap } from "./error";
import { createSlug, getUrl } from "./services";
import cors from "cors";

async function main() {

  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors({
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.get("/health", async (req, res) => {
    res.send({ status: "pass" });
  });

  app.post("/create", async (req, res) => {
    console.log("creating slug");
    await wrap(req, res, async () => createSlug(req.body));
  });

  app.get("/:slug", async (req, res) => {
    console.log("getting url");
    await wrap(req, res, async () => getUrl(req.params.slug));
  });

  app.listen({ port: 8080 });
  console.log(`Listening at http://localhost:8080`);
}

main();
