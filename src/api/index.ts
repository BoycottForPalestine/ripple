import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import lambda from "./lambda";
import alert from "./alert";
import ping from "./ping";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/:organization/lambda", lambda);
router.use("/:organization/alert", alert);
router.use("/:organization/ping", ping);

export default router;
