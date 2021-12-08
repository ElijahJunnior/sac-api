import Router from 'express';
import { Request, Response } from 'express';
import { OcorrenciaController } from '../controllers/OcorrenciaController';

const ocorrenciaRoutes = Router();

ocorrenciaRoutes.get('/ListarAbertas', OcorrenciaController.getOcorrencia);

export { ocorrenciaRoutes };