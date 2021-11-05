import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    // 
    if (req.originalUrl === '/auth/token') {
        next();
        return;
    }
    // 
    let token = <string>req.headers['authorization'] ||
        <string>req.headers['auth'] ||
        <string>req.headers['x-access-token'];
    // 
    if (!token) {
        res.status(401).json({ message: 'token must be informed!' });
        return;
    }
    // 
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    // 
    try {
        const jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET ?? '')
        res.locals.jwtPayload = jwtPayload;
    } catch (err) {
        res.status(401).json({ message: 'Failed to authenticate token!' });
        return;
    }
    // 
    next();
}