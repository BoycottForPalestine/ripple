import express from "express";
import { Fetcher, getFetchers } from "../model/fetchers";
import { Alert, getAlerts } from "../model/alerts";
import { alertService } from "../lib/alert-service";

const router = express.Router();

router.get<{}, Alert[]>("/", async (req, res) => {
  try {
    const alerts = await getAlerts();
    return res.json(alerts);
  } catch (e) {
    console.error(e);
  }
});

router.post("/", async (req, res) => {
  const alert = req.body;
  try {
    await alertService.createAlert(alert);
    return res.sendStatus(201);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const alert = req.body;
  try {
    await alertService.updateAlert(alert);
    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await alertService.deleteAlert(id);
    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

export default router;
