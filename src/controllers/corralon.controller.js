import { getConection, sql } from "../database/conection";
import { HTTP_STATUS, MESSAGES } from "../database/status";

export const getCorralones = async (req,res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT c.idCorralon, c.razonSocial, c.idRegion, r.nombre as nombre_region, c.direccion, CONVERT(FLOAT,c.latitud) AS latitud, CONVERT(FLOAT,c.longitud) AS longitud, c.diasHabiles, c.responsable, c.telefono FROM corralon as c LEFT JOIN region as r ON c.idRegion = r.idRegion;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }

        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
}

export const createCorralon = async (req,res) => {
    const { idRegion, razonSocial, direccion, latitud, longitud, diasHabiles, responsable, telefono } = req.body;
    if (idRegion && razonSocial && direccion && latitud && longitud && diasHabiles && responsable && telefono) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('idRegion', sql.Int, idRegion)
            .input('razonSocial', sql.VarChar, razonSocial)
            .input('direccion', sql.VarChar, direccion)
            .input('latitud', sql.VarChar, latitud)
            .input('longitud', sql.VarChar, longitud)
            .input('diasHabiles', sql.VarChar, diasHabiles)
            .input('responsable', sql.VarChar, responsable)
            .input('telefono', sql.VarChar, telefono)
            .query('INSERT INTO corralon (idRegion, razonSocial, direccion, latitud, longitud, diasHabiles, responsable, telefono) VALUES (@idRegion, @razonSocial, @direccion, @latitud, @longitud, @diasHabiles, @responsable, @telefono);');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error){
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg:MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
                .json({msg:MESSAGES.BAD_REQUEST, content: {
                    "idRegion": idRegion, 
                    "razonSocial": razonSocial,
                    "direccion": direccion,
                    "latitud": latitud,
                    "longitud": longitud,
                    "diasHabiles": diasHabiles,
                    "responsable": responsable,
                    "telefono": telefono
                    }
                });
    }    
}

export const getCorralonById = async (req,res) => {
    const { idCorralon } = req.params;
    if (idCorralon){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input("idCorralon", sql.Int, idCorralon)
            .query('SELECT c.idCorralon, c.razonSocial, c.idRegion, r.nombre as nombre_region, c.direccion, CONVERT(FLOAT,c.latitud) AS latitud, CONVERT(FLOAT,c.longitud) AS longitud, c.diasHabiles, c.responsable, c.telefono FROM corralon as c LEFT JOIN region as r ON c.idRegion = r.idRegion WHERE c.idCorralon = @idCorralon;')

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset})
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idCorralon': idCorralon}})
    }
}

export const deleteCorralonById = async (req,res) => {
    const { idCorralon } = req.params;
    if (idCorralon){
        try {
            const pool = await getConection();
            await pool.request()
            .input("idCorralon", sql.Int, idCorralon)
            .query('DELETE FROM corralon WHERE idCorralon = @idCorralon')

            return res.status(HTTP_STATUS.DELETE_SUCCES)
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idCorralon': idCorralon}})
    }
}

export const updateCorralonById = async (req,res) => {
    const { idCorralon } = req.params;
    const { idRegion, razonSocial, direccion, latitud, longitud, diasHabiles, responsable, telefono } = req.body;
    
    if (idCorralon && idRegion && razonSocial && direccion && latitud && longitud && diasHabiles && responsable && telefono) {
        try {
            const pool = await getConection();
            await pool.request()
            .input('idRegion', sql.Int, idRegion)
            .input('razonSocial', sql.VarChar, razonSocial)
            .input('direccion', sql.VarChar, direccion)
            .input('latitud', sql.VarChar, latitud)
            .input('longitud', sql.VarChar, longitud)
            .input('diasHabiles', sql.VarChar, diasHabiles)
            .input('responsable', sql.VarChar, responsable)
            .input('telefono', sql.VarChar, telefono)
            .input('idCorralon', sql.Int, idCorralon)
            .query('UPDATE corralon SET idRegion = @idRegion, razonSocial = @razonSocial, direccion = @direccion, latitud = @latitud, longitud = @longitud, diasHabiles = @diasHabiles, responsable = @responsable, telefono = @telefono WHERE idCorralon = @idCorralon;');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content: {
                "idRegion": idRegion,
                "razonSocial": razonSocial,
                "direccion": direccion,
                "latitud": latitud,
                "longitud": longitud,
                "diasHabiles": diasHabiles,
                "responsable": responsable,
                "telefono": telefono
            }
        })
    }
}