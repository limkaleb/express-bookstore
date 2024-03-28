import { Router } from 'express';
import { registerUser, getUserById, fetchUsers, authUser, logoutUser } from '../controllers/users';

const router = Router();

router.get('/', fetchUsers);

router.get('/:id', getUserById);

router.post('/', registerUser);

router.post('/auth', authUser);

router.post('/logout', logoutUser);

export default router;
