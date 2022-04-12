import { Request, Response, Router } from "express";
import { Connection } from "../Connection";

const batchRouter = Router()

type Ocorrencia = { 
  ID_OCORRENCIA: string, 
  DATA: string, 
  HORA: string, 
  CODIGO_CLIENTE: string, 
  ID_USUARIO: string, 
  CODIGO_CATEG: string, 
  CODIGO_SUBCATEG: string, 
  CODIGO_SISTEMA: string, 
  NOME_CONTATO: string, 
  TELEFONE_CONTATO: string, 
  DESCRICAO_OCORRENCIA: string, 
  TIPO_OCORRENCIA: string, 
  STATUS_OCORRENCIA: string, 
  CODIGO_PRIORIDADE: string, 
  ULT_ID_USUARIO: string, 
  ULT_TIPO_OCORRENCIA: string, 
  ULT_DATA: string, 
  ULT_HORA: string, 
  ULT_ID_PROVIDENCIA: string, 
  EM_ATENDIMENTO: string, 
  ID_USUARIO_EM_ATEND: string, 
  DATA_EM_ATEND: string, 
  HORA_EM_ATEND: string 
}

type Providencia = { 
  ID_PROVIDENCIA: string, 
  ID_OCORRENCIA: string, 
  ID_USUARIO: string, 
  DATA_INI: string, 
  HORA_INI: string, 
  DESCRICAO_PROVIDENCIA: string, 
  CODIGO_SOLUCAO: string, 
  TIPO_PROVIDENCIA: string, 
  STATUS_PROVIDENCIA: string, 
  CODIGO_PRIORIDADE: string, 
  DATA_FIM: string, 
  HORA_FIM: string, 
  ID_USUARIO_AGEND: string, 
  DATA_AGEND: string, 
  HORA_AGEND: string 
}

// batchRouter.post('/sincronize_table', async (req: Request, res: Response) => { 
  
//   let tra: Transaction | undefined = undefined;

//   try {
   
//     // monta consulta 
//     const sql_select_ocorrencias = `SELECT * FROM OCORRENCIA`;
    
//     // carrega dados no banco de dados 
//     const ocorrencias: Ocorrencia[] = await Connection.SAC_PROD.query(sql_select_ocorrencias).then(data => data.recordset);

//     // monta consulta 
//     const sql_select_providencias = `SELECT * FROM PROVIDENCIA`;

//     // carrega dados no banco de dados 
//     const providencias: Providencia[] = await Connection.SAC_PROD.query(sql_select_providencias).then(data => data.recordset);
      
//     tra = Connection.SAC.transaction();

//     tra.begin();

//     for (const ocorrencia of ocorrencias) {
    
//       const sql_insert_ocorrencia = `
//         INSERT INTO OCORRENCIA (
//           ID_OCORRENCIA, DATA, HORA, CODIGO_CLIENTE, ID_USUARIO, 
//           CODIGO_CATEG, CODIGO_SUBCATEG, CODIGO_SISTEMA, NOME_CONTATO, 
//           TELEFONE_CONTATO, DESCRICAO_OCORRENCIA, TIPO_OCORRENCIA, 
//           STATUS_OCORRENCIA, CODIGO_PRIORIDADE, ULT_ID_USUARIO, 
//           ULT_TIPO_OCORRENCIA, ULT_DATA, ULT_HORA, ULT_ID_PROVIDENCIA, 
//           EM_ATENDIMENTO, ID_USUARIO_EM_ATEND, DATA_EM_ATEND, HORA_EM_ATEND  
//         ) VALUES (
//           ${ocorrencia.ID_OCORRENCIA}, ${ocorrencia.DATA}, ${ocorrencia.HORA}, ${ocorrencia.CODIGO_CLIENTE}, ${ocorrencia.ID_USUARIO}, 
//           ${ocorrencia.CODIGO_CATEG}, ${ocorrencia.CODIGO_SUBCATEG}, ${ocorrencia.CODIGO_SISTEMA}, ${ocorrencia.NOME_CONTATO}, 
//           ${ocorrencia.TELEFONE_CONTATO}, ${ocorrencia.DESCRICAO_OCORRENCIA}, ${ocorrencia.TIPO_OCORRENCIA}, 
//           ${ocorrencia.STATUS_OCORRENCIA}, ${ocorrencia.CODIGO_PRIORIDADE}, ${ocorrencia.ULT_ID_USUARIO}, 
//           ${ocorrencia.ULT_TIPO_OCORRENCIA}, ${ocorrencia.ULT_DATA}, ${ocorrencia.ULT_HORA}, ${ocorrencia.ULT_ID_PROVIDENCIA}, 
//           ${ocorrencia.EM_ATENDIMENTO}, ${ocorrencia.ID_USUARIO_EM_ATEND}, ${ocorrencia.DATA_EM_ATEND}, ${ocorrencia.HORA_EM_ATEND} 
//         )`;      

//         const result = await Connection.SAC.query(sql_insert_ocorrencia);
//         console.log('result_ocorrencia', result);

//     }

//     for(const providencia of providencias) {

//       const sql_insert_providencia = `
//         INSERT INTO PROVIDENCIA ( 
//           ID_PROVIDENCIA, ID_OCORRENCIA, ID_USUARIO, DATA_INI, 
//           HORA_INI, DESCRICAO_PROVIDENCIA, CODIGO_SOLUCAO, 
//           TIPO_PROVIDENCIA, STATUS_PROVIDENCIA, CODIGO_PRIORIDADE, 
//           DATA_FIM, HORA_FIM, ID_USUARIO_AGEND, DATA_AGEND, HORA_AGEND 
//         ) VALUES ( 
//           ${providencia.ID_PROVIDENCIA}, ${providencia.ID_OCORRENCIA}, 
//           ${providencia.ID_USUARIO}, ${providencia.DATA_INI}, 
//           ${providencia.HORA_INI}, ${providencia.DESCRICAO_PROVIDENCIA}, 
//           ${providencia.CODIGO_SOLUCAO}, ${providencia.TIPO_PROVIDENCIA}, 
//           ${providencia.STATUS_PROVIDENCIA}, ${providencia.CODIGO_PRIORIDADE}, 
//           ${providencia.DATA_FIM}, ${providencia.HORA_FIM}, 
//           ${providencia.ID_USUARIO_AGEND}, ${providencia.DATA_AGEND}, 
//           ${providencia.HORA_AGEND} 
//         )`;

//         const result = await Connection.SAC.query(sql_insert_providencia);
//         console.log('result_providencia', result);
//     }
    
//     tra.commit();
//     // // varre dados carregados da base e monta array tipada
//     // for (const item of data) {
//     //     const ocorrencia: OcorrenciaGet = this.mountOcorrenciaObject(item);
//     //     ocorrencia.cliente = await getClienteOcorrencia(item.CODIGO_CLIENTE);
//     //     ocorrencia.usuario = await getUsuarioOcorrencia(item.ID_USUARIO);
//     //     ocorrencia.ultimo_usuario = await getUsuarioOcorrencia(item.ULT_ID_USUARIO);
//     //     ocorrencia.usuario_atendendo = await getUsuarioOcorrencia(item.ID_USUARIO_EM_ATEND);
//     //     ocorrencias.push(ocorrencia);
//     // };

//     res.send({result: "sucess!"});

//   } catch (err) {
//     try { 
//       tra?.rollback();
//     } catch(err) {
//       console.log('rowback_error', err);
//     }
//     throw err;
//   }
    
// })

export { batchRouter }