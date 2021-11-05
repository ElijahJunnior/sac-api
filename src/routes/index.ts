import { Router } from 'express';
import { authRoutes } from './AuthRoutes';
import { userRoutes } from './UserRoutes';
import { checkJwt } from '../middlewares/checkJwt';

const routes = Router();
routes.use(checkJwt);
routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
export { routes };