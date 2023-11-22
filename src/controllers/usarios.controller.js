import { response } from 'express';
import { getConection, sql} from '../database/conection'
import {HTTP_STATUS, MESSAGES} from '../database/status'


//querys
export const getUsuarios = async (req, res) => {
  try {
    const pool = await getConection();
    const result = await pool.request()
      .query('SELECT u.idUsuario, u.nombre, u.apellido, u.nombreDeUsuario, u.contrasena, ut.nombre AS tipo FROM usuario AS u LEFT JOIN usuario_tipo AS ut ON u.idUsuarioTipo = ut.idUsuarioTipo;');

    return res.status(HTTP_STATUS.SUCCESS).json({ msg: MESSAGES.SUCCESS, content: result.recordset });
  } catch (error) {
    if (error.code === 'EREQUEST') {
      return res.status(HTTP_STATUS.DATABASE_ERROR).json({ msg: MESSAGES.DATABASE_ERROR, error });
    }
    return res.status(HTTP_STATUS.NOT_FOUND).json({ msg: MESSAGES.NOT_FOUND, error });
  }
};

export const newUsuario = async (req, res) => {
    const { idUsuarioTipo, nombre, apellido, nombreDeUsuario, contrasena } =  req.body

    if (idUsuarioTipo && nombre && apellido && nombreDeUsuario && contrasena) {
        let pool;
        try {
            pool = await getConection();

            await pool.request()
            .input('idUsuarioTipo',sql.Int,idUsuarioTipo)
            .input('nombre',sql.VarChar,nombre)
            .input('apellido',sql.VarChar,apellido)
            .input('nombreDeUsuario',sql.VarChar,nombreDeUsuario)
            .input('contrasena',sql.VarChar,contrasena)
            .query('INSERT INTO usuario (idUsuarioTipo, nombre, apellido, nombreDeUsuario, contrasena) VALUES (@idUsuarioTipo, @nombre, @apellido, @nombreDeUsuario, @contrasena);');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST});
    }     
}

export const getUsuarioById = async (req, res) => {
    const { idUsuario } =  req.params
    if(idUsuario){
        let pool;
        try {
            pool = await getConection();

            const result = await pool.request()
            .input('idUsuario',sql.Int,idUsuario)
            .query('SELECT u.idUsuario, u.nombre, u.apellido, u.nombreDeUsuario, u.contrasena, ut.nombre AS tipo FROM usuario AS u LEFT JOIN usuario_tipo AS ut ON u.idUsuarioTipo = ut.idUsuarioTipo WHERE idUsuario = @idUsuario;');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset[0]});   
        } catch (error) {
            if (error.code === 'EREQUEST') {
                return res.status(HTTP_STATUS.DATABASE_ERROR).json({ msg: MESSAGES.DATABASE_ERROR, error });
            }
            return res.status(HTTP_STATUS.NOT_FOUND).json({ msg: MESSAGES.NOT_FOUND, error });
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST});
    }
}