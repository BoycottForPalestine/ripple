import express from "express";
import { Fetcher, getFetchers, updateCronExpression } from "../model/fetchers";
import { registry } from "../fetchers/registry";

const router = express.Router();

type FetcherResponse = Fetcher[];

router.get<{}, FetcherResponse>("/", async (req, res) => {
  try {
    const fetchers = await getFetchers();
    return res.json(fetchers);
  } catch (e) {
    console.error(e);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { cronPattern } = req.body;

  try {
    if (!id || !cronPattern) {
      return res.sendStatus(400);
    }

    registry.updateCronExpression(id, cronPattern);

    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

export default router;
