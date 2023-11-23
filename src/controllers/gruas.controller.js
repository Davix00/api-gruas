import { getConection, sql} from '../database/conection'
import {HTTP_STATUS, MESSAGES} from '../database/status'

export const getGruas = async (req, res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT g.idGrua, g.idCorralon, c.razonSocial AS nombre_corralon, g.idGruaTipo, gt.nombre AS grua_tipo, g.matricula FROM grua AS g LEFT JOIN corralon AS c ON g.idCorralon = c.idCorralon LEFT JOIN grua_tipo AS gt ON g.idGruaTipo = gt.idGruaTipo;');
        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const createGrua = async (req, res) => {
    const { idCorralon, idGruaTipo, matricula } =  req.body;
    if (idCorralon && idGruaTipo && matricula) {
        try {
            const pool = await getConection();
         await pool.request()
            .input('idCorralon',sql.Int, idCorralon)
            .input('idGruaTipo',sql.Int, idGruaTipo)
            .input('matricula',sql.VarChar, matricula)
            .query('INSERT INTO grua (idCorralon, idGruaTipo, matricula) VALUES (@idCorralon, @idGruaTipo, @matricula);');
         return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
     } catch (error){
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg:MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"idCorralon": idCorralon, "idGruaTipo": idGruaTipo, "matricula":matricula }});
    } 
        
};

export const getGruaById = async (req, res) => {
    const { idGrua } =  req.params;
    if(idGrua){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('idGrua',sql.Int,idGrua)
            .query('SELECT g.idGrua, g.idCorralon, c.razonSocial AS nombre_corralon, g.idGruaTipo, gt.nombre AS grua_tipo, g.matricula FROM grua AS g LEFT JOIN corralon AS c ON g.idCorralon = c.idCorralon LEFT JOIN grua_tipo AS gt ON g.idGruaTipo = gt.idGruaTipo WHERE g.idGrua = @idGrua');
            if(result.recordset[0]){
                return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset[0]});   
            }
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST});
    }
};

export const deleteUsuario = async (req,res) => {
    const { idGrua } =  req.params;
    if(idGrua){
        try {
            const pool = await getConection();

            await pool.request()
            .input('idGrua', sql.Int, idGrua)
            .query('DELETE FROM grua WHERE idGrua = @idGrua;');
            return res.status(HTTP_STATUS.DELETE_SUCCES);   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST});
    }
};

export const updateGruaById = async (req, res) => {
    const { idCorralon, idGruaTipo, matricula } =  req.body;
    const { idGrua } = req.params;
    if (idCorralon && idGruaTipo && matricula) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('idCorralon', sql.Int, idCorralon)
            .input('idGruaTipo', sql.Int, idGruaTipo)
            .input('matricula', sql.VarChar, matricula)
            .input('idGrua', sql.Int, idGrua)
            .query('UPDATE grua SET idCorralon = @idCorralon, idGruaTipo = @idGruaTipo, matricula = @matricula WHERE idGrua = @idGrua;');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST});
    } 
};