import { getConection, sql } from "../database/conection";
import { HTTP_STATUS, MESSAGES } from "../database/status";

export const getSiniestro = async (req,res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT s.idSiniestro, s.idReportador, r.nombre AS nombre_reportador, s.folio, s. direccion, s.fecha FROM siniestro AS s LEFT JOIN reportador AS r ON s.idReportador = r.idReportador;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }

        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
}

export const createSiniestro = async (req,res) => {
    const { idReportador, direccion } = req.body;
    if (idReportador && direccion) {
        try {
            const pool = await getConection();

            //creando folio 
            const formato = 'smv-acc'           
            const siniestro = await sql.query`SELECT COUNT(*) as siniestros FROM siniestro;`;
            const folio = formato + (siniestro.recordset[0].siniestros + 1);


            await pool.request()
            .input('idReportador', sql.Int, idReportador)
            .input('folio', sql.VarChar, folio)
            .input('direccion', sql.VarChar, direccion)
            .query('INSERT INTO siniestro (idReportador, folio, direccion, fecha) VALUES (@idReportador, @folio, @direccion, SYSDATETIME());');
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error){
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg:MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
                .json({msg:MESSAGES.BAD_REQUEST, content: {
                    "idReportador": idReportador,
                    "direccion": telefono
                    }
                });
    }    
}

export const getSiniestrorById = async (req,res) => {
    const { idSiniestro } = req.params;
    if (idSiniestro){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input("idSiniestro", sql.Int, idSiniestro)
            .query('SELECT s.idSiniestro, s.idReportador, r.nombre AS nombre_reportador, s.folio, s. direccion, s.fecha FROM siniestro AS s LEFT JOIN reportador AS r ON s.idReportador = r.idReportador WHERE idSiniestro = @idSiniestro;')

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset})
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idSiniestro': idSiniestro || ''}})
    }
}

export const deleteSiniestroById = async (req,res) => {
    const { idSiniestro } = req.params;
    if (idSiniestro){
        try {
            const pool = await getConection();
            await pool.request()
            .input("idSiniestro", sql.Int, idSiniestro)
            .query('DELETE FROM siniestro WHERE idSiniestro = @idSiniestro')

            return res.status(HTTP_STATUS.DELETE_SUCCES)
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idSiniestro': idSiniestro || ''}})
    }
}

export const updateSiniestrorById = async (req,res) => {
    const { idSiniestro } = req.params;
    const { idReportador, direccion, folio } = req.body;
    
    if (idSiniestro && idReportador && direccion && folio) {
        try {
            const pool = await getConection();
            await pool.request()
            .input('idReportador', sql.Int, idReportador)
            .input('direccion', sql.VarChar, direccion)
            .input('folio', sql.VarChar, folio)
            .input('idSiniestro', sql.Int, idSiniestro)
            .query('UPDATE siniestro SET idReportador = @idReportador, direccion = @direccion, folio = @folio WHERE idSiniestro = @idSiniestro;');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content: {
                "idSiniestro": idSiniestro,
                "idReportador": idReportador,
                "direccion": direccion,
                "folio": folio,
            }
        })
    }
}