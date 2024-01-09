import express from "express";
import { db } from "../config";
import { users } from "../schema/schema";

const router = express.Router();

router.get("/", async (req, res) => {
  const usersData = await db.select().from(users);

  res.send(usersData);
});

export default router;
