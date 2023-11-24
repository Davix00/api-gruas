import { getConection, sql } from "../database/conection";
import { HTTP_STATUS, MESSAGES } from "../database/status";

export const getOperador = async (req,res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT o.idOperador, o.idGrua, g.matricula AS matricula_grua, o.nombre AS nombre_operador, o.telefono, o.numeroLicencia FROM operador AS o LEFT JOIN grua AS g ON o.idGrua = g.idGrua;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }

        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
}

export const createOperador = async (req,res) => {
    const { idGrua, nombre, telefono, numeroLicencia } = req.body;
    if (idGrua && nombre && telefono && numeroLicencia) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('idGrua', sql.Int, idGrua)
            .input('nombre', sql.VarChar, nombre)
            .input('telefono', sql.VarChar, telefono)
            .input('numeroLicencia', sql.VarChar, numeroLicencia)
            .query('INSERT INTO operador (idGrua, nombre, telefono, numeroLicencia) VALUES (@idGrua, @nombre, @telefono, @numeroLicencia);');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error){
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg:MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
                .json({msg:MESSAGES.BAD_REQUEST, content: {
                    "idGrua": idGrua,
                    "nombre": nombre,
                    "telefono": telefono,
                    "numeroLicencia": numeroLicencia
                    }
                });
    }    
}

export const getOperadorById = async (req,res) => {
    const { idOperador } = req.params;
    if (idOperador){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input("idOperador", sql.Int, idOperador)
            .query('SELECT o.idOperador, o.idGrua, g.matricula AS matricula_grua, o.nombre AS nombre_operador, o.telefono, o.numeroLicencia FROM operador AS o LEFT JOIN grua AS g ON o.idGrua = g.idGrua WHERE idOperador = @idOperador;')

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset})
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idOperador': idOperador || ''}})
    }
}

export const deleteOperadorById = async (req,res) => {
    const { idOperador } = req.params;
    if (idOperador){
        try {
            const pool = await getConection();
            await pool.request()
            .input("idOperador", sql.Int, idOperador)
            .query('DELETE FROM operador WHERE idOperador = @idOperador')

            return res.status(HTTP_STATUS.DELETE_SUCCES)
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idOperador': idOperador || ''}})
    }
}

export const updateOperadorById = async (req,res) => {
    const { idOperador } = req.params;
    const { idGrua, nombre, telefono, numeroLicencia } = req.body;
    
    if (idGrua && nombre && telefono && numeroLicencia && idOperador) {
        try {
            const pool = await getConection();
            await pool.request()
            .input('idOperador', sql.Int, idOperador)
            .input('idGrua', sql.Int, idGrua)
            .input('nombre', sql.VarChar, nombre)
            .input('telefono', sql.VarChar, telefono)
            .input('numeroLicencia', sql.VarChar, numeroLicencia)
            .query('UPDATE operador SET idGrua = @idGrua, nombre = @nombre, telefono = @telefono WHERE idOperador = @idOperador;');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content: {
                "idOperador": idOperador,
                "idGrua": idGrua,
                "nombre": nombre,
                "telefono": telefono,
                "numeroLicencia": numeroLicencia
            }
        })
    }
}