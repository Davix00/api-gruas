import { getConection, sql} from '../database/conection';
import { HTTP_STATUS, MESSAGES } from '../database/status';

export const getUsuarios = async (req, res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT u.idUsuario, u.nombre, u.apellido, u.nombreDeUsuario, u.contrasena, ut.nombre AS tipo FROM usuario AS u LEFT JOIN usuario_tipo AS ut ON u.idUsuarioTipo = ut.idUsuarioTipo;');
        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const createUsuario = async (req, res) => {
    const { idUsuarioTipo, nombre, apellido, nombreDeUsuario, contrasena } =  req.body;

    if (idUsuarioTipo && nombre && apellido && nombreDeUsuario && contrasena) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('idUsuarioTipo', sql.Int, idUsuarioTipo)
            .input('nombre', sql.VarChar, nombre)
            .input('apellido', sql.VarChar, apellido)
            .input('nombreDeUsuario', sql.VarChar, nombreDeUsuario)
            .input('contrasena', sql.VarChar, contrasena)
            .query('INSERT INTO usuario (idUsuarioTipo, nombre, apellido, nombreDeUsuario, contrasena) VALUES (@idUsuarioTipo, @nombre, @apellido, @nombreDeUsuario, @contrasena);');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST,  content: {
            "idUsuarioTipo": idUsuarioTipo,
            "nombre": nombre,
            "apellido": apellido,
            "nombreDeUsuario": nombreDeUsuario,
            "contrasena": contrasena 
            }
        });
    }     
};

export const getUsuarioById = async (req, res) => {
    const { idUsuario } =  req.params;
    if(idUsuario){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('idUsuario', sql.Int,idUsuario)
            .query('SELECT u.idUsuario, u.nombre, u.apellido, u.nombreDeUsuario, u.contrasena, ut.nombre AS tipo FROM usuario AS u LEFT JOIN usuario_tipo AS ut ON u.idUsuarioTipo = ut.idUsuarioTipo WHERE idUsuario = @idUsuario;');
            if(result.recordset[0]){
                return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset[0]});   
            }
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"idUsuario": idUsuario || ''}});
    }
};

export const deleteUsuario = async (req,res) => {
    const { idUsuario } =  req.params;
    if(idUsuario){
        try {
            const pool = await getConection();

            await pool.request()
            .input('idUsuario', sql.Int, idUsuario)
            .query('DELETE FROM usuario WHERE idUsuario = @idUsuario;');
            return res.status(HTTP_STATUS.DELETE_SUCCES);   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"idusuario": idUsuario || ''}});
    }
};

export const countUsuarios = async (req, res) => {
    try {
        const pool = await getConection();
        const result = await pool.request()
        .query('SELECT COUNT(*) as usuarios_totales FROM usuario;');
        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset[0]});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
          return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const updateUsuarioById = async (req, res) => {
    const { idUsuarioTipo, nombre, apellido, nombreDeUsuario, contrasena } =  req.body;
    const { idUsuario } = req.params;
    if (idUsuarioTipo && nombre && apellido && nombreDeUsuario && contrasena && idUsuario) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('idUsuarioTipo', sql.Int, idUsuarioTipo)
            .input('nombre', sql.VarChar, nombre)
            .input('apellido', sql.VarChar, apellido)
            .input('nombreDeUsuario', sql.VarChar, nombreDeUsuario)
            .input('contrasena', sql.VarChar, contrasena)
            .input('idUsuario', sql.Int, idUsuario)
            .query('UPDATE usuario SET idUsuarioTipo = @idUsuarioTipo, nombre = @nombre, apellido = @apellido, nombreDeUsuario = @nombreDeUsuario, contrasena = @contrasena WHERE idUsuario = @idUsuario;');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).
        json({msg: MESSAGES.BAD_REQUEST, content:{
                "idUsuarioTipo": idUsuarioTipo,
                "nombre": nombre,
                "apellido": apellido,
                "nombreDeUsario": nombreDeUsuario,
                "idUsuario": idUsuario,
                "contrasena": contrasena
            }
        });
    } 
};

export const login = async (req,res) => {
    const { nombreDeUsuario, contrasena } = req.params
    if(nombreDeUsuario && contrasena){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('nombreDeUsuario', sql.VarChar, nombreDeUsuario)
            .input('contrasena', sql.VarChar, contrasena)
            .query('SELECT u.nombre, u.apellido, u.nombreDeUsuario, ut.nombre AS tipo FROM usuario AS u LEFT JOIN usuario_tipo AS ut ON u.idUsuarioTipo = ut.idUsuarioTipo WHERE nombreDeUsuario = @nombreDeUsuario AND contrasena = @contrasena;');
            if(result.recordset[0]){
                return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset[0]});   
            }
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content: {
                "nombreDeUsuario": nombreDeUsuario,
                "contrasena": contrasena
            }
        });
    }
}