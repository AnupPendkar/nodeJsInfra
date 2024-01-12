import { eq } from 'drizzle-orm';
import { db } from '../config';
import { users } from '../schema/schema';
import { Request, Response, NextFunction } from 'express';

export async function userLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const [user, ...rest] = await db.select().from(users).where(eq(users.username, username));

    if (!user) {
      res.status(404).json({ message: 'Invalid user credentials' });
      return;
    }

    const isPasswordValid = password === user.password;

    if (isPasswordValid) {
      res.json({ message: 'Login successful', user: { username } });
    } else {
      res.status(403).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    next(error);
  }
}
