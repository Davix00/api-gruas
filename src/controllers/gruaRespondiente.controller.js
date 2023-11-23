import { getConection, sql } from "../database/conection";
import { HTTP_STATUS, MESSAGES } from "../database/status";

export const getGruasRespondientes = async (req,res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT gr.id, gr.idGrua, g.matricula as matricula_grua, gr.idSiniestro, s.folio as folio_siniestro FROM gruas_respondientes AS gr LEFT JOIN grua AS g ON gr.idGrua = g.idGrua LEFT JOIN siniestro AS s ON gr.idSiniestro = s.idSiniestro');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }

        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
}

export const createGruaRespondiente = async (req,res) => {
    const {  idGrua, idSiniestro } = req.body;
    if (idGrua && idSiniestro) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('idGrua', sql.Int, idGrua)
            .input('idSiniestro', sql.Int, idSiniestro)
            .query('INSERT INTO gruas_respondientes (idGrua, idSiniestro) VALUES (@idGrua, @idSiniestro);');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error){
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg:MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
                .json({msg:MESSAGES.BAD_REQUEST, content: {
                    "idGrua": idGrua, 
                    "idSiniestro": idSiniestro
                    }
                });
    }    
}

export const getGruaRespondienteById = async (req,res) => {
    const { id } = req.params;
    if (id){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input("id", sql.Int, id)
            .query('SELECT gr.id, gr.idGrua, g.matricula as matricula_grua, gr.idSiniestro, s.folio as folio_siniestro FROM gruas_respondientes AS gr LEFT JOIN grua AS g ON gr.idGrua = g.idGrua LEFT JOIN siniestro AS s ON gr.idSiniestro = s.idSiniestro WHERE id = @id')

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset})
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'id': id || ''}})
    }
}

export const deleteGruaRespondienteById = async (req,res) => {
    const { id } = req.params;
    if (id){
        try {
            const pool = await getConection();
            await pool.request()
            .input("id", sql.Int, id)
            .query('DELETE FROM gruas_respondientes WHERE id = @id')

            return res.status(HTTP_STATUS.DELETE_SUCCES)
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'id': id || ''}})
    }
}

export const updateGruaRespondienteById = async (req,res) => {
    const { id } = req.params;
    const { idGrua, idSiniestro } = req.body;
    
    if (id && idGrua && idSiniestro) {
        try {
            const pool = await getConection();
            await pool.request()
            .input('idGrua', sql.Int, idGrua)
            .input('idSiniestro', sql.Int, idSiniestro)
            .input('id', sql.Int, id)
            .query('UPDATE gruas_respondientes SET idGrua = @idGrua, idSiniestro = @idSiniestro WHERE id = @id;');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content: {
                "id": id || '',
                "idGrua": idGrua,
                "idSiniestro": idSiniestro
            }
        })
    }
}