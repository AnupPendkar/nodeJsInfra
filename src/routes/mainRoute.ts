import express from 'express';
import { db } from '../config';
import { userLogin, userRegister, updateUsername, deleteUser } from '../controllers/userControllers';
import { allPosts, userPosts, createPost, updatePost, deletePost } from '../controllers/postController';

const router = express.Router();

router.get('/', async (req, res) => {
  const userData = await db.query.users.findMany({
    with: {
      posts: true,
    },
  });

  const data = userData?.filter((usr) => usr?.posts?.length > 0);

  res.send(data);
});

// User routes
router.post('/login', userLogin);
router.post('/register', userRegister);
router.put('/update', updateUsername);
router.delete('/delete', deleteUser);

// Posts routes
router.get('/get-all-posts', allPosts);
router.get('/get-posts', userPosts);
router.post('/create-post', createPost);
router.put('/update-post', updatePost);
router.delete('/delete-post', deletePost);


export default router;
