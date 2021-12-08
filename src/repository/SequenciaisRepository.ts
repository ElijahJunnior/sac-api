import { Connection } from '../Connection';

export enum BaseSequencial {
    SAC,
    FINANCEIRO
}

export class SequenciaisRepository {

    static async getSequencial(base: BaseSequencial, nomeSistema: string, nomeTabela: String) {

        const con = base === BaseSequencial.SAC ? Connection.SAC : Connection.FIN;

        const sql = `EXEC GET_SEQUENCIAL @NOME_SISTEMA='${nomeSistema}', @NOME_TABELA= '${nomeTabela}'`;

        const data = await con.query(sql).then(data => data?.recordset[0]);

        if (data) {
            const seq: number = data.SEQUENCIAL;
            return seq;
        } else {
            return undefined;
        }

    }

}