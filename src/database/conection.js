import sql from 'mssql'
import config from '../config';

const dbsettings = {
    user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    database: config.dbName,
    options: {
        trustServerCertificate: true,
    },
};

export async function getConection() {
    try {
        const pool = await sql.connect(dbsettings);
        return pool;
    } catch (error) {
        console.log('Error: ',error)
    }
}

export { sql };