import sql from 'mssql';

export async function openConnection() {

    const sqlConfig = {
        user: process.env.DB_USER ?? '',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_DATABASE ?? '',
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
        await sql.connect(sqlConfig)
        console.log('Connection opened successfully')
    } catch (err) {
        console.log('Erro to open connection: ', err)
        // ... error checks
    }

}

export { sql };