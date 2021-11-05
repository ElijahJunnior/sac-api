// import { Router } from 'express';
// import { sign, verify } from 'jsonwebtoken';
// import {
//     User, getUsersList, getUserByLogin, getUserByLoginAndPassword
// } from './Database/users';

// // import { sql } from './Connection';

// const router = Router();

// router.use((req, res, next) => {
//     console.log('========================================================= ');
//     console.log(' New Request                                              ');
//     console.log('========================================================= ');
//     console.log('baseUrl: ', req.baseUrl);
//     console.log('body: ', req.body);
//     console.log('headers: ', req.headers);
//     console.log('originalUrl: ', req.originalUrl);
//     console.log('params: ', req.params);
//     console.log('path: ', req.path);
//     console.log('query: ', req.query);
//     console.log('route: ', req.route);
//     console.log('secure: ', req.secure);
//     console.log('subdomains: ', req.subdomains);
//     console.log('--------------------------------------------------------- ');
//     next();
// })

// router.use((req, res, next) => {
//     // 
//     if (req.originalUrl === '/auth/token') {
//         next();
//     }
//     // 
//     let token = req.headers['authorization'] || req.headers['x-access-token'];
//     // 
//     if (!token) {
//         res.status(401).json({ message: 'token must be informed!' });
//     }
//     // 
//     if (String(token).startsWith('Bearer ')) {
//         token = token?.slice(7, token.length);
//     }
//     // 
//     verify(String(token), process.env.JWT_SECRET ?? '', (err, decode) => {
//         // 
//         if (err) {
//             res.status(500).json({ message: 'Failed to authenticate token!' });
//         } else {

//         }
//     });
//     // 
//     next();
// })

// router.get('/', (req, res) => {
//     res.status(201).json({ message: 'Hello World' })
// });

// // ##### ROTAS DE AUTENTICAÇÃO
// router.post('/auth/token', async (req, res) => {


// })

// // ##### ROTAS DO CADASTRO DE USUARIOS
// router.get('/users', (req, res) => {

//     async function execute() {
//         try {
//             // Executando a consulta na base de dados 
//             const users = await getUsersList();
//             // respondendo a requisição com a lista de usuarios
//             res.status(201).json(users);
//         }
//         catch (err) {
//             console.log(err);
//             res.status(401).json({ message: "erro on database access" });
//         }
//     }

//     execute();

// })

// router.get('/cadastro/users/:login', (req, res) => {

//     async function execute() {
//         try {
//             // Valida se o email foi informado
//             if (!req.params.login) {
//                 res.status(500).send({ message: 'email must be informed!' });
//             }
//             // Executando a consulta na base de dados
//             const users = await getUserByLogin(req.params.login);
//             // respondendo a requisição com a lista de usuarios
//             res.status(201).json(users);
//         }
//         catch (err) {
//             console.log(err);
//             res.status(500).json({ message: "erro on database access" });
//         }
//     }

//     execute();

// })

// // router.get('/users', (req, res, next) => {
// //     const user = [
// //         {
// //             name: 'Elias Jr',
// //             login: 'elijah.junnior',
// //             password: 'senha123'
// //         }, {
// //             name: 'Rodrigo Rodrigues',
// //             login: 'rodriguinho.rj',
// //             password: 'senha123'
// //         }

// //     ];
// //     res.send('teste');
// // })

// export { router };