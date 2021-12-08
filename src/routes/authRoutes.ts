import { Router } from 'express';
import { body } from 'express-validator';
import { checkExpressValidator } from '../middlewares/checkExpressValidator'
import { AuthController } from '../controllers/AuthController';

const authRoutes = Router();

authRoutes.post(
    '/token',
    // valida os parametros informados
    body('login').exists(),
    body('password').exists(),
    checkExpressValidator,
    // gera o token
    AuthController.generateToken
);

export { authRoutes };