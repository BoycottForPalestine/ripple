import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import activities from "./activities";
import alerts from "./alerts";
import ping from "./ping";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/activities", activities);
router.use("/alerts", alerts);
router.use("/ping", ping);

export default router;
