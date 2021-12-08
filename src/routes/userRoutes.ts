import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';

const userRoutes = Router();

userRoutes.get('/hello', (req: Request, res: Response) => {
    res.status(201).json({ message: 'Hello!!!' });
});

export { userRoutes };