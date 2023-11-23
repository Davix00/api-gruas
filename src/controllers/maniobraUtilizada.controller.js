import { getConection, sql } from "../database/conection";
import { HTTP_STATUS, MESSAGES } from "../database/status";

export const getManiobrasUtilizdas = async (req,res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT mu.id, mu.idManiobra, m.nombre, mu.idSiniestro, s.folio as folio_siniestro, mu.idVehiculo, v.matricula as matricula_vehiculo FROM maniobras_utilizadas AS mu LEFT JOIN maniobra AS M ON mu.idManiobra = m.idManiobra LEFT JOIN siniestro AS s ON mu.idSiniestro = s.idSiniestro LEFT JOIN vehiculo AS v ON mu.idVehiculo = v.idVehiculo;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }

        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
}

export const createManiobrasUtilizadas = async (req,res) => {
    const { idManiobra, idSiniestro, idVehiculo } = req.body;
    if (idManiobra && idSiniestro && idVehiculo) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('idManiobra', sql.Int, idManiobra)
            .input('idSiniestro', sql.Int, idSiniestro)
            .input('idVehiculo', sql.Int, idVehiculo)
            .query('INSERT INTO maniobras_utilizadas (idManiobra, idSiniestro, idVehiculo) VALUES (@idManiobra, @idSiniestro, @idVehiculo);');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error){
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg:MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
                .json({msg:MESSAGES.BAD_REQUEST, content: {
                    "idManiobra": idManiobra,
                    "idSiniestro": idSiniestro,
                    "idVehiculo": idVehiculo
                    }
                });
    }    
}

export const getManiobrasUtilizadasById = async (req,res) => {
    const { id } = req.params;
    if (id){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input("id", sql.Int, id)
            .query('SELECT mu.id, mu.idManiobra, m.nombre, mu.idSiniestro, s.folio as folio_siniestro, mu.idVehiculo, v.matricula as matricula_vehiculo FROM maniobras_utilizadas AS mu LEFT JOIN maniobra AS M ON mu.idManiobra = m.idManiobra LEFT JOIN siniestro AS s ON mu.idSiniestro = s.idSiniestro LEFT JOIN vehiculo AS v ON mu.idVehiculo = v.idVehiculo WHERE id = @id;')

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset})
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'id': id || ''}})
    }
}

export const deleteManiobraUtilizadaById = async (req,res) => {
    const { id } = req.params;
    if (id){
        try {
            const pool = await getConection();
            await pool.request()
            .input("id", sql.Int, id)
            .query('DELETE FROM maniobras_utilizadas WHERE id = @id')

            return res.status(HTTP_STATUS.DELETE_SUCCES)
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'id': id || ''}})
    }
}

export const updateManiobraById = async (req,res) => {
    const { id } = req.params;
    const { idManiobra, idSiniestro, idVehiculo } = req.body;
    
    if (idManiobra && idSiniestro && idVehiculo && id) {
        try {
            const pool = await getConection();
            await pool.request()
            .input('id', sql.Int, id)
            .input('idManiobra', sql.Int, idManiobra)
            .input('idSiniestro', sql.Int, idSiniestro)
            .input('idVehiculo', sql.Int, idVehiculo)
            .query('UPDATE maniobras_utilizadas SET idManiobra = @idManiobra, idSiniestro = @idSiniestro, idVehiculo = @idVehiculo WHERE id = @id;');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content: {
                "idManiobra": idManiobra,
                "idSiniestro": idSiniestro,
                "idVehiculo": idVehiculo
            }
        })
    }
}