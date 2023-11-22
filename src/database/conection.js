import sql from 'mssql'
import { config } from 'dotenv'
config()

const dbsettings = {
    user: process.env.user,
    password: process.env.password,
    server: process.env.server,
    database: process.env.database,
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