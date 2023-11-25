import { getConection, sql } from '../database/conection';
import { HTTP_STATUS, MESSAGES } from '../database/status';

export const getVehiculosTipos = async (req, res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT idVehiculoTipo, nombre, precio FROM vehiculo_tipo;');
        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const createVehiculoTipo = async (req, res) => {
    const { nombre, precio } =  req.body;

    if (nombre && precio) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('precio', sql.Money, precio)
            .query('INSERT INTO vehiculo_tipo (nombre, precio) VALUES (@nombre,@precio);');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).
        json({msg: MESSAGES.BAD_REQUEST,  content: {
            "nombre": nombre,
            "precio": precio 
            }
        });
    }     
};

export const getVehiculosTiposById = async (req, res) => {
    const { idVehiculoTipo } =  req.params;
    if(idVehiculoTipo){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('idVehiculoTipo', sql.Int,idVehiculoTipo)
            .query('SELECT idVehiculoTipo, nombre, precio FROM vehiculo_tipo WHERE idVehiculoTipo = @idVehiculoTipo;');
            if(result.recordset[0]){
                return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset[0]});   
            }
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"idVehiculoTipo": idVehiculoTipo || ''}});
    }
};

export const deleteVehiculoTipo = async (req,res) => {
    const { idVehiculoTipo } =  req.params;
    if(idVehiculoTipo){
        try {
            const pool = await getConection();

            await pool.request()
            .input('idVehiculoTipo', sql.Int, idVehiculoTipo)
            .query('DELETE FROM vehiculo_tipo WHERE idVehiculoTipo = @idVehiculoTipo;');
            return res.status(HTTP_STATUS.DELETE_SUCCES);   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"idVehiculoTipo": idVehiculoTipo || ''}});
    }
};


export const updateVehiculoTipoById = async (req, res) => {
    const { nombre, precio } =  req.body;
    const { idVehiculoTipo } = req.params;
    if (idVehiculoTipo && nombre && precio) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('idVehiculoTipo', sql.Int, idVehiculoTipo)
            .input('nombre', sql.VarChar, nombre)
            .input('precio', sql.Money, precio)
            .query('UPDATE vehiculo_tipo SET nombre = @nombre, precio = @precio WHERE idVehiculoTipo = @idVehiculoTipo;');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content:{
                "idVehiculoTipo": idVehiculoTipo,
                "nombre": nombre,
                "precio": precio
            }
        });
    } 
};