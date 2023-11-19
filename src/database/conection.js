import sql from 'mssql'
import {config} from 'dotenv'
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

async function getConecttion(){
    try {
        const pool = await sql.connect(dbsettings)
        return pool;
    } catch (error) {
        console.log(error)
    }
}

getConecttion()