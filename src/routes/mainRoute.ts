import express from 'express';
import { db } from '../config';
import { users } from '../schema/schema';
import { userLogin } from '../controllers/userControllers';

const router = express.Router();

router.get('/', async (req, res) => {
  const usersData = await db.select().from(users);

  res.send(usersData);
});

router.post('/login', userLogin);

export default router;
