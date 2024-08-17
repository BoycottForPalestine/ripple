import express from "express";
import {
  Activity,
  getActivities,
  updateCronExpression,
} from "../model/activities";
import { registry } from "../activities/registry";

const router = express.Router();

type ActivityResponse = Activity[];

router.get<{}, ActivityResponse>("/", async (req, res) => {
  try {
    const activities = await getActivities();
    return res.json(activities);
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
