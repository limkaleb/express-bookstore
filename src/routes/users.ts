import { Router } from 'express';
import { registerUser, getUserById, fetchUsers } from '../controllers/users';

const router = Router();

router.get('/', fetchUsers);

router.get('/:id', getUserById);

router.post('/', registerUser);

export default router;
