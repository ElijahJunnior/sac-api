import { Request, Response, NextFunction } from 'express';
import { OcorrenciaRepository } from '../repository/OcorrenciaRepository';

export class OcorrenciaController {

    static getOcorrencia = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ocorrencias = await OcorrenciaRepository.getAbertas();
            res.json(ocorrencias);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Something broke!' });
        }
    }

}