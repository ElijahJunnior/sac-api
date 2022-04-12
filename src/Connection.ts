import { connect, ConnectionPool } from 'mssql';

type ConnectionProps = {
    FIN: ConnectionPool,
    SAC: ConnectionPool,
    open: () => Promise<void>
}

export const Connection: ConnectionProps = {
    FIN: <ConnectionPool>{},
    SAC: <ConnectionPool>{},
    open: async () => {

        const sac_config = {
            database: process.env.DB_SAC_DATABASE ?? '',
            server: process.env.DB_SAC_SERVER ?? '',
            port: Number(process.env.DB_SAC_PORT ?? 0),
            user: process.env.DB_SAC_USER ?? '',
            password: process.env.DB_SAC_PASSWORD ?? '',
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: false, // for azure
                trustServerCertificate: false, // change to true for local dev / self-signed certs
            }
        }

        const financeiro_config = {
            database: process.env.DB_FINANCEIRO_DATABASE ?? '',
            server: process.env.DB_FINANCEIRO_SERVER ?? '',
            port: Number(process.env.DB_FINANCEIRO_PORT ?? 0),
            user: process.env.DB_FINANCEIRO_USER ?? '',
            password: process.env.DB_FINANCEIRO_PASSWORD ?? '',
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: false, // for azure
                trustServerCertificate: false, // change to true for local dev / self-signed certs
            }
        }

        try {
            // make sure that any items are correctly URL encoded in the connection string
            Connection.SAC = new ConnectionPool(sac_config);
            Connection.SAC.connect();
            console.log('Connection on SAC database opened successfully');
        } catch (err) {
            console.log('Erro to open connection on SAC database: ', err);
        }

        try {
            // make sure that any items are correctly URL encoded in the connection string
            Connection.FIN = new ConnectionPool(financeiro_config);;
            Connection.FIN.connect();
            console.log('Connection on Financeiro database opened successfully');
        } catch (err) {
            console.log('Erro to open connection on Financeiro database: ', err);
        }
    }
}