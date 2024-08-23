import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ success: req.params });
});

export default router;
