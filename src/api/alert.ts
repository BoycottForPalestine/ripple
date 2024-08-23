import express from "express";
import { Lambda, getLambdas } from "../model/lambdas";
import { Alert, getAlerts } from "../model/alerts";
import { alertService } from "../lib/alert-service";
import { asyncMiddleware } from "../middlewares/async";

const router = express.Router();

router.get<{}, Alert[]>(
  "/",
  asyncMiddleware(async (req, res) => {
    try {
      const alerts = await getAlerts();
      res.json(alerts);
    } catch (e) {
      console.error(e);
    }
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const alert = req.body;
    try {
      await alertService.createAlert(alert);
      res.sendStatus(201);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  })
);

router.patch(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const alert = req.body;
    try {
      await alertService.updateAlert(alert);
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  })
);

router.delete(
  "/:id",
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    try {
      await alertService.deleteAlert(id);
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  })
);

export default router;
