import { Connection } from '../Connection';
import { OcorrenciaGet, ClienteOcorrencia, UsuarioOcorrencia, OcorrenciaPost } from '../entity/Ocorrencia';
import { ocorrenciaRoutes } from '../routes/ocorrenciaRoutes';

export class OcorrenciaRepository {

    static getAbertas = async () => {
        try {
            // declara variaveis usadas na função 
            const ocorrencias: OcorrenciaGet[] = [];
            // monta consulta 
            const SQL = `
                SELECT OCORRENCIA.ID_OCORRENCIA, OCORRENCIA.DATA, OCORRENCIA.ULT_DATA, OCORRENCIA.HORA, 
                    OCORRENCIA.ULT_HORA, OCORRENCIA.NOME_CONTATO, OCORRENCIA.TELEFONE_CONTATO, 
                    OCORRENCIA.DESCRICAO_OCORRENCIA, OCORRENCIA.CODIGO_PRIORIDADE, 
                    OCORRENCIA.STATUS_OCORRENCIA, OCORRENCIA.ULT_TIPO_OCORRENCIA, 
                    OCORRENCIA.EM_ATENDIMENTO, OCORRENCIA.CODIGO_CLIENTE, OCORRENCIA.ID_USUARIO, 
                    OCORRENCIA.ULT_ID_USUARIO, OCORRENCIA.ID_USUARIO_EM_ATEND, SISTEMAS.NOME_SISTEMA, 
                    TAB_TIPO_ATENDIMENTO.DESC_TIPO_ATEND, TAB_CATEGORIA.DESCRICAO_CATEG,
                    TAB_SUBCATEGORIA.DESCRICAO_SUBCATEG, 
                    (   
                        SELECT COUNT(ID_PROVIDENCIA) 
                        FROM PROVIDENCIA 
                        WHERE PROVIDENCIA.ID_OCORRENCIA = OCORRENCIA.ID_OCORRENCIA
                    ) AS PROVIDENCIAS 
                FROM OCORRENCIA 
                    INNER JOIN SISTEMAS ON OCORRENCIA.CODIGO_SISTEMA = SISTEMAS.COD_SISTEMA 
                    INNER JOIN TAB_CATEGORIA ON OCORRENCIA.CODIGO_CATEG = TAB_CATEGORIA.CODIGO_CATEG 
                    INNER JOIN TAB_SUBCATEGORIA 
                        ON OCORRENCIA.CODIGO_CATEG = TAB_SUBCATEGORIA.CODIGO_CATEG 
                        AND OCORRENCIA.CODIGO_SUBCATEG = TAB_SUBCATEGORIA.CODIGO_SUBCATEG 
                    INNER JOIN TAB_TIPO_ATENDIMENTO 
                        ON OCORRENCIA.ULT_TIPO_OCORRENCIA = TAB_TIPO_ATENDIMENTO.COD_TIPO_ATEND 
                WHERE OCORRENCIA.STATUS_OCORRENCIA = 'A' AND OCORRENCIA.ULT_TIPO_OCORRENCIA = 'S' 
                ORDER BY OCORRENCIA.ULT_DATA, OCORRENCIA.ULT_HORA
            `;
            // carrega dados no banco de dados 
            const data = await Connection.SAC.query(SQL).then(data => data.recordset);
            // varre dados carregados da base e monta array tipada
            for (const item of data) {
                const ocorrencia: OcorrenciaGet = this.mountOcorrenciaObject(item);
                ocorrencia.cliente = await getClienteOcorrencia(item.CODIGO_CLIENTE);
                ocorrencia.usuario = await getUsuarioOcorrencia(item.ID_USUARIO);
                ocorrencia.ultimo_usuario = await getUsuarioOcorrencia(item.ULT_ID_USUARIO);
                ocorrencia.usuario_atendendo = await getUsuarioOcorrencia(item.ID_USUARIO_EM_ATEND);
                ocorrencias.push(ocorrencia);
            };
            // retorna resultado da conculta
            return ocorrencias;
        } catch (err) {
            throw err;
        }
    }

    static create = async (ocorrencia: OcorrenciaPost) => {
        try {

            // DATA, HORA, , ULT_ID_USUARIO, ULT_TIPO_OCORRENCIA, ULT_DATA, ULT_HORA, ULT_ID_PROVIDENCIA 

            const SQL = `
                INSERT INTO OCORRENCIA (
                    ID_OCORRENCIA, DATA, OCORRENCIA.HORA, NOME_CONTATO, TELEFONE_CONTATO, 
                    DESCRICAO_OCORRENCIA, CODIGO_PRIORIDADE, STATUS_OCORRENCIA, EM_ATENDIMENTO, 
                    CODIGO_CLIENTE, ID_USUARIO, CODIGO_SISTEMA, CODIGO_CATEG, CODIGO_SUBCATEG 
                ) VALUES (
                    '${ocorrencia.id}', 
                    '${ocorrencia.data}', 
                    '${ocorrencia.hora}', 
                    '${ocorrencia.nome_contato}', 
                    '${ocorrencia.telefone_contato}', 
                    '${ocorrencia.descricao}', 
                    '${ocorrencia.codigo_prioridade}', 
                    '${ocorrencia.status}', 
                    '${ocorrencia.em_atendimento}', 
                    '${ocorrencia.id_cliente}', 
                    '${ocorrencia.id_usuario}', 
                    '${ocorrencia.id_sistema}', 
                    '${ocorrencia.id_categoria}', 
                    '${ocorrencia.id_subcategoria}'  
                )
            `;

        } catch (err) {
            throw err;
        }
    }

    static mountOcorrenciaObject = (data: any) => {
        const ocorrencia: OcorrenciaGet = {
            id: data.ID_OCORRENCIA,
            data: data.DATA,
            hora: data.HORA,
            descricao: data.DESCRICAO_OCORRENCIA,
            codigo_prioridade: data.CODIGO_PRIORIDADE,
            status: data.STATUS_OCORRENCIA,
            nome_contato: data.NOME_CONTATO,
            telefone_contato: data.TELEFONE_CONTATO,
            em_atendimento: data.EM_ATENDIMENTO,
            nome_sistema: data.NOME_SISTEMA,
            descricao_tipo_atendimento: data.DESC_TIPO_ATEND,
            descricao_categoria: data.DESCRICAO_CATEG,
            descricao_sub_categoria: data.DESCRICAO_SUBCATEG,
            ultimo_tipo_ocorrencia: data.ULT_TIPO_OCORRENCIA,
            ultima_data: data.ULT_DATA,
            ultima_hora: data.ULT_HORA
        };
        return ocorrencia;
    }
}

async function getClienteOcorrencia(id_cliente: string) {
    // monta objeto cliente com as informações recebidas por parametro
    const cliente: ClienteOcorrencia = {
        id: id_cliente
    }
    // criar a consulta na base de clientes
    const SQL = `
        SELECT CODIGO_CLIENTE, NOME, FANTASIA, CPF_CGC, PERFIL 
        FROM CLIENTES 
        WHERE CODIGO_CLIENTE = '${id_cliente}' 
    `;
    // executa a query e busca o primeiro registro retornado
    const data = await Connection.FIN.query(SQL).then(data => data?.recordset[0] || undefined);
    // caso encotre um registro, atualiza o objeto com os dados obtidos da base
    if (data) {
        cliente.razao_social = data.NOME;
        cliente.nome_fantasia = data?.FANTASIA;
        cliente.cpf_cnpj = data?.CPF_CGC;
        cliente.perfil = data?.PERFIL;
    }
    // retorna o objeto montado
    return cliente;
}

async function getUsuarioOcorrencia(id_usuario: string) {
    // monta objeto cliente com as informações recebidas por parametro
    const usuario: UsuarioOcorrencia = {
        id: id_usuario
    };
    // criar a consulta
    const SQL = `
        SELECT USUARIOS.NOME_USUARIO 
        FROM USUARIOS 
        WHERE USUARIOS.ID_USUARIO = ${id_usuario} 
    `;
    // executa a query e busca o primeiro registro retornado
    const data = await Connection.SAC.query(SQL).then(data => data?.recordset[0] || undefined);
    // caso encotre um registro, atualiza o objeto com os dados obtidos da base
    if (data) {
        usuario.nome = data.NOME_USUARIO;
    }
    // retorna o objeto montado
    return usuario;
}