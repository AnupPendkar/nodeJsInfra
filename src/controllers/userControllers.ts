import { eq } from 'drizzle-orm';
import { db } from '../config';
import { users } from '../schema/schema';
import { Request, Response, NextFunction } from 'express';
import { isPropEmpty } from '../utils/utils';

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

export async function userRegister(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password, name, email, phone } = req.body;

    const usernameExists = await db.select({ username: users.username }).from(users).where(eq(username, users.username));
    if (!isPropEmpty(usernameExists)) {
      res.status(422).json({ message: 'Username already taken!' });
      return;
    }

    const emailExists = await db.select({ email: users.email }).from(users).where(eq(email, users.email));
    if (!isPropEmpty(emailExists)) {
      res.status(422).json({ message: 'Entered email already registered!' });
      return;
    }

    const [newUser, ...rest] = await db.insert(users).values({ username, password, fullName: name, email, phoneNo: phone }).returning({
      userId: users?.id,
      name: users?.fullName,
      email: users?.email,
    });

    if (newUser) {
      res.json({ message: 'Registered successfully', newUser });
    }
  } catch (err) {
    next(err);
  }
}

export async function updateUserDetails(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (err) {
    next(err);
  }
}
