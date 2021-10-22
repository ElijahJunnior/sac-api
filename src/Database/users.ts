import { sql } from '../Connection';

export type User = {
    id: string,
    id_sac: string,
    login: string,
    name: string,
    email: string,
    admin: string,
    adminGO2: string
    createdAt: string
}

export async function getUsersList() {
    try {
        // Executando a consulta na base de dados 
        const stSQL = `
            SELECT LOGIN, NOME, COD_USUARIO, SE_ADMIN, DATA_CAD, 
            EMAIL, ID_USUARIO, ID_USUARIO_SAC, ADMIN_GO2 
            FROM USUARIOS 
        `;
        const data = await sql.query(stSQL).then(data => data.recordset);
        // Varrendo a massa de dados carregada do servidor e criando lista com dados formatados
        const users = data.reduce((acc: User[], cur) => {
            acc.push(mountUserObject(cur));
            return acc;
        }, [] as User[]);
        // respondendo a requisição com a lista de usuarios
        return users;
    }
    catch (err) {
        throw err;
    }
}

export async function getUserByLogin(login: string) {
    try {
        // Executando a consulta na base de dados 
        const stSQL = `
            SELECT LOGIN, NOME, COD_USUARIO, SE_ADMIN, DATA_CAD, 
            EMAIL, ID_USUARIO, ID_USUARIO_SAC, ADMIN_GO2 
            FROM USUARIOS 
            WHERE LOGIN = '${login}' 
        `;
        const data = await sql.query(stSQL).then(data => data.recordset[0]);
        // Verifica se o registro foi encontrado o monta caso verdadeiro
        if (data) {
            return mountUserObject(data);
        } else {
            return {};
        }
    }
    catch (err) {
        throw err;
    }
}

export async function getUserByLoginAndPassword(login: string, password: string) {
    try {
        // Executando a consulta na base de dados 
        const stSQL = `
            SELECT LOGIN, NOME, COD_USUARIO, SE_ADMIN, DATA_CAD, 
            EMAIL, ID_USUARIO, ID_USUARIO_SAC, ADMIN_GO2 
            FROM USUARIOS 
            WHERE LOGIN = '${login}' AND SENHA = '${password}' 
        `;
        const data = await sql.query(stSQL).then(data => data.recordset[0]);
        // Verifica se o registro foi encontrado o monta caso verdadeiro
        if (data) {
            return mountUserObject(data);
        } else {
            return undefined;
        }
    } catch (err) {
        throw err;
    }
}

function mountUserObject(data: any) {

    const user: User = {
        id: data.ID_USUARIO,
        id_sac: data.ID_USUARIO_SAC,
        login: data.LOGIN.trim(),
        name: data.NOME.trim(),
        email: data.EMAIL,
        admin: data.SE_ADMIN,
        adminGO2: data.ADMIN_GO2,
        createdAt: data.DATA_CAD
    };

    return user;
}