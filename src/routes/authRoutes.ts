import { Router } from 'express';
import { User } from '../entity/User';
import { AuthController } from '../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/token', AuthController.generateToken);

export { authRoutes };