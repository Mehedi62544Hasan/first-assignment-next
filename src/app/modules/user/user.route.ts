import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getUser);
router.get('/:userId', UserControllers.deleteUser);

export const UserRoutes = router;
