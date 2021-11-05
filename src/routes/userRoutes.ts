import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { Request, Response, NextFunction } from 'express';

const userRoutes = Router();

userRoutes.get('/test', (req: Request, res: Response) => {
    res.status(201).json({ data: 'success!' });
});

export { userRoutes };