import { Router } from 'express';
import { registerUser, getUserById, fetchUsers, authUser, logoutUser } from '../controllers/users';
import { fetchBooks } from '../controllers/books';

const router = Router();

router.get('/', fetchBooks);

router.get('/:id', getUserById);

router.post('/', registerUser);


export default router;
