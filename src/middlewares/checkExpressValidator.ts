import { Request, Response, NextFunction, request } from 'express';
import { validationResult } from 'express-validator';

export const checkExpressValidator = (req: Request, res: Response, next: NextFunction) => {
    // busca os erros gerados pelo express-validator
    const errs = validationResult(req);
    // verifica se algum erro foi retornado
    if (!errs.isEmpty()) {
        return res.status(400).json({ errors: errs.array() })
    };
    // continua a execução
    next();
    return;
}