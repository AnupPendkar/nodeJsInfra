import express from 'express';
import { db } from '../config';
import { users } from '../schema/schema';
import { userLogin, userRegister } from '../controllers/userControllers';

const router = express.Router();

router.get('/', async (req, res) => {
  const usersData = await db.select().from(users);

  res.send(usersData);
});

router.post('/login', userLogin);
router.post('/register', userRegister);

export default router;
