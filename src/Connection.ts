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

        const SACConfig = {
            user: process.env.DB_USER ?? '',
            password: process.env.DB_PASSWORD ?? '',
            database: process.env.DB_DATABASE_SAC ?? '',
            server: process.env.DB_SERVER ?? '',
            port: Number(process.env.DB_PORT ?? 0),
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

        const FINConfig = {
            user: process.env.DB_USER ?? '',
            password: process.env.DB_PASSWORD ?? '',
            database: process.env.DB_DATABASE_FIN ?? '',
            server: process.env.DB_SERVER ?? '',
            port: Number(process.env.DB_PORT ?? 0),
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
            Connection.SAC = await connect(SACConfig);
            console.log('Connection on SAC database opened successfully')
        } catch (err) {
            console.log('Erro to open connection on SAC database: ', err)
        }

        try {
            // make sure that any items are correctly URL encoded in the connection string
            Connection.FIN = await connect(FINConfig);
            console.log('Connection on Financeiro database opened successfully')
        } catch (err) {
            console.log('Erro to open connection on Financeiro database: ', err)
        }

    }
}