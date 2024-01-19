import { eq } from 'drizzle-orm';
import { db } from '../config';
import { Request, Response, NextFunction } from 'express';
import { isPropEmpty } from '../utils/utils';
import { users } from '../schema/userSchema';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function userLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const [foundUsr, ...rest] = await db.select().from(users).where(eq(users.username, username));

    if (!foundUsr) {
      res.status(404).json({ message: 'Invalid users credentials' });
      return;
    }

    const isPasswordValid = password === foundUsr.password;

    if (isPasswordValid) {
      const access = jwt.sign({ username: foundUsr.username }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });

      const refresh = jwt.sign({ username: foundUsr.username }, process.env.SECRET_KEY, {
        expiresIn: '2d',
      });

      res.json({ access, refresh });
    } else {
      res.status(403).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    next(error);
  }
}

export async function checkUsernameExits(username) {
  return await db.select({ username: users.username, id: users.id }).from(users).where(eq(username, users.username));
}

export async function checkEmailExits(email) {
  return await db.select({ email: users.email }).from(users).where(eq(email, users.email));
}

export async function userRegister(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password, name, email, phone } = req.body;

    if (!isPropEmpty(await checkUsernameExits(username))) {
      res.status(422).json({ message: 'Username already taken!' });
      return;
    }

    if (!isPropEmpty(await checkEmailExits(email))) {
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

export async function updateUsername(req: Request, res: Response, next: NextFunction) {
  try {
    const { curr_username, updated_username } = req.body;
    const [curr_user, ...rest] = await checkUsernameExits(curr_username);
    if (isPropEmpty(curr_user)) {
      res.status(422).json({ message: 'Requested username not found' });
      return;
    }

    const [updated_user, ...restt] = await checkUsernameExits(updated_username);
    if (!isPropEmpty(updated_user)) {
      res.status(422).json({ message: 'Username already taken!!' });
      return;
    }

    const updatedUser = await db.update(users).set({ username: updated_username }).where(eq(curr_username, users.username));
    if (updatedUser) {
      res.json({ message: 'Username updated succesfully!!!' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { username } = req.body;
    const [deletedUsr, ...rest] = await checkUsernameExits(username);
    if (isPropEmpty(deletedUsr)) {
      res.status(422).json({ message: 'Requested username not found' });
      return;
    }

    const deletedUser = await db.delete(users).where(eq(username, users));
    if (deletedUser) {
      res.json('User Deleted succesfully!!!');
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}
