import { Connection } from '../Connection';
import { User } from '../entity/User';

function mountUserObject(data: any) {

    const user: User = {
        id: data.ID_USUARIO,
        login: data.LOGIN.trim(),
        email: data.EMAIL,
        createdAt: data.DATA_CAD
    };

    return user;
}

export class UsuarioRepository {

    static getList = async () => {
        try {
            // Executando a consulta na base de dados 
            const stSQL = `
                SELECT ID_USUARIO, LOGIN, EMAIL, DATA_CAD 
                FROM USUARIOS 
            `;
            const data = await Connection.SAC.query(stSQL).then(data => data.recordset);
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

    static getByLogin = async (login: string) => {
        try {
            // Executando a consulta na base de dados 
            const SQL = `
                SELECT ID_USUARIO, LOGIN, EMAIL, DATA_CAD 
                FROM USUARIOS 
                WHERE LOGIN = '${login}' 
            `;
            const data = await Connection.SAC.query(SQL).then(data => data?.recordset[0]);
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

    static getByLoginAndPassword = async (login: string, password: string) => {
        try {
            // Executando a consulta na base de dados 
            const stSQL = `
                SELECT ID_USUARIO, LOGIN, EMAIL, DATA_CAD 
                FROM USUARIOS 
                WHERE LOGIN = '${login}' AND SENHA = '${password}' 
            `;
            const data = await Connection.SAC.query(stSQL).then(data => data.recordset[0]);
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

}