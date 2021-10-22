import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import {
    User, getUsersList, getUserByLogin, getUserByLoginAndPassword
} from './Database/users';

// import { sql } from './Connection';

const router = Router();

router.get('/', (req, res) => {
    res.status(201).json({ message: 'Hello World' })
});

// ##### ROTAS DE AUTENTICAÇÃO
router.post('/auth/token', async (req, res) => {

    const { login, password } = req.body;

    if (!login) res.status(500).json({ message: 'login must be informed!' });
    if (!password) res.status(500).json({ message: 'password must be informed!' });

    try {
        // 
        const user = await getUserByLoginAndPassword(login, password);
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
        token.accessToken = sign(payload, process.env.JWT_SECRET ?? '', {
            expiresIn: token.expiresIn
        })

        res.json(token);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something broke!' })
    }
})

// ##### ROTAS DO CADASTRO DE USUARIOS
router.get('/cadastro/users', (req, res) => {

    async function execute() {
        try {
            // Executando a consulta na base de dados 
            const users = await getUsersList();
            // respondendo a requisição com a lista de usuarios
            res.status(201).json(users);
        }
        catch (err) {
            console.log(err);
            res.status(401).json({ message: "erro on database access" });
        }
    }

    execute();

})

router.get('/cadastro/users/:login', (req, res) => {

    async function execute() {
        try {
            // Valida se o email foi informado
            if (!req.params.login) {
                res.status(500).send({ message: 'email must be informed!' });
            }
            // Executando a consulta na base de dados
            const users = await getUserByLogin(req.params.login);
            // respondendo a requisição com a lista de usuarios
            res.status(201).json(users);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "erro on database access" });
        }
    }

    execute();

})

// router.get('/users', (req, res, next) => {
//     const user = [
//         {
//             name: 'Elias Jr',
//             login: 'elijah.junnior',
//             password: 'senha123'
//         }, {
//             name: 'Rodrigo Rodrigues',
//             login: 'rodriguinho.rj',
//             password: 'senha123'
//         }

//     ];
//     res.send('teste');
// })

export { router };