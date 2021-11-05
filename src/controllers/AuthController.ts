import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/UserRepository';

class AuthController {

    static generateToken = async (req: Request, res: Response, next) => {

        const { login, password } = req.body;

        if (!login) res.status(500).json({ message: 'login must be informed!' });
        if (!password) res.status(500).json({ message: 'password must be informed!' });

        try {
            // 
            const user = await UserRepository.getUserByLoginAndPassword(login, password);
            // 
            if (!user) {
                res.status(404).json({ message: 'user not found!' });
            }
            // 
            const payload = {
                id: user?.id,
                login: user?.login,
            }
            // 
            const token = {
                accessToken: '',
                type: 'bearer',
                expiresIn: 60 * 60 * 24
            }
            // 
            token.accessToken = jwt.sign(payload, process.env.JWT_SECRET ?? '', {
                expiresIn: token.expiresIn
            })

            res.json(token);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Something broke!' })
        }

    }

}

export { AuthController };