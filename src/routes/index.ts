import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { ocorrenciaRoutes } from './ocorrenciaRoutes';
import { checkJwt } from '../middlewares/checkJwt';

import { BaseSequencial, SequenciaisRepository } from '../repository/SequenciaisRepository';
import { batchRouter } from './batchRouter';

const routes = Router();

// routes.use(checkJwt);
routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/ocorrencia', ocorrenciaRoutes);

routes.use('/teste', async (req, res, next) => {
    const sequencial = await SequenciaisRepository.getSequencial(
        BaseSequencial.SAC, 'SACGO2', 'OCORRENCIA'
    );
    res.status(201).json({
        sequencial
    })
});

export { routes };