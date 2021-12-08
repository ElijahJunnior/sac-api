import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsuarioRepository } from '../repository/UsuarioRepository';

class AuthController {

    static generateToken = async (req: Request, res: Response, next: NextFunction) => {

        const { login, password } = req.body;

        try {
            // verifica se existe algum usuario que coincida com o usuario e senha informado
            const user = await UsuarioRepository.getByLoginAndPassword(login, password);
            // retorna erro caso não encontre o usuario 
            if (!user) {
                res.status(404).json({ message: 'user not found!' });
            }
            // monta o payload para o token
            const payload = {
                id: user?.id,
                login: user?.login,
            }
            // monta o objeto de retorno do token
            const token = {
                accessToken: '',
                type: 'bearer',
                expiresIn: 60 * 60 * 24
            }
            // gera o token jwt 
            token.accessToken = jwt.sign(payload, process.env.JWT_SECRET ?? '', {
                expiresIn: token.expiresIn
            })
            // retorna o token 
            res.json(token);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Something broke!' });
        }
    }

}

export { AuthController };