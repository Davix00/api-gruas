import { getConection, sql } from "../database/conection";
import { HTTP_STATUS, MESSAGES } from "../database/status";

export const getManiobras = async (req,res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT * FROM maniobra');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }

        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
}

export const createManiobra = async (req,res) => {
    const { nombre, precio } = req.body;
    if (nombre && precio) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('precio', sql.Money, precio)
            .query('INSERT INTO maniobra (nombre, precio) VALUES (@nombre, @precio);');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error){
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg:MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
                .json({msg:MESSAGES.BAD_REQUEST, content: {
                    "nombre": nombre,
                    "precio": precio
                    }
                });
    }    
}

export const getManiobraById = async (req,res) => {
    const { idManiobra } = req.params;
    if (idManiobra){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input("idManiobra", sql.Int, idManiobra)
            .query('SELECT * FROM maniobra WHERE idManiobra = @idManiobra;')

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset})
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idCorralon': idCorralon}})
    }
}

export const deleteManiobraById = async (req,res) => {
    const { idManiobra } = req.params;
    if (idManiobra){
        try {
            const pool = await getConection();
            await pool.request()
            .input("idManiobra", sql.Int, idManiobra)
            .query('DELETE FROM maniobra WHERE idManiobra = @idManiobra')

            return res.status(HTTP_STATUS.DELETE_SUCCES)
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idManiobra': idManiobra || ''}})
    }
}

export const updateManiobraById = async (req,res) => {
    const { idManiobra } = req.params;
    const { nombre, precio } = req.body;
    
    if (idManiobra && nombre && precio) {
        try {
            const pool = await getConection();
            await pool.request()
            .input('idManiobra', sql.Int, idManiobra)
            .input('nombre', sql.VarChar, nombre)
            .input('precio', sql.Money, precio)
            .query('UPDATE maniobra SET nombre = @nombre, precio = @precio WHERE idManiobra = @idManiobra;');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content: {
                "idManiobra": idManiobra,
                "nombre": nombre,
                "precio": precio
            }
        })
    }
}