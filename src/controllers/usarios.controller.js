import { getConection, sql} from '../database/conection'

//querys
export const getUsuarios = async (req, res) => {
    let pool;

    try {
        pool = await getConection();
        const result = await pool.request().query('SELECT u.idUsuario, u.nombre, u.apellido, u.nombreDeUsuario, u.contrasena, ut.nombre AS tipo FROM usuario AS u LEFT JOIN usuario_tipo AS ut ON u.idUsuarioTipo = ut.idUsuarioTipo;');
        return res.status(200).json(result.recordset);   
    } catch (erno){
        return res.status(404).json({msg: 'Recurso no encontrado.', error: erno});
    } finally {
        if(pool) pool.close();
    }
}

export const newUsuario = async (req, res) => {
    const { idUsuarioTipo, nombre, apellido, nombreDeUsuario, contrasena } =  req.body

    if (idUsuarioTipo != null || nombre != null || apellido != null || nombreDeUsuario != null || contrasena != null) {
        let pool;
        try {
            pool = await getConection();

            await pool.request()
            .input('idUsuarioTipo',sql.Int,idUsuarioTipo)
            .input('nombre',sql.VarChar,nombre)
            .input('apellido',sql.VarChar,apellido)
            .input('nombreDeUsuario',sql.VarChar,nombreDeUsuario)
            .input('contrasena',sql.VarChar,contrasena)
            .query('INSERT INTO usuario (idUsuarioTipo, nombre, apellido, nombreDeUsuario,contrasena) VALUES (@idUsuarioTipo, @nombre, @apellido, @nombreDeUsuario, @contrasena)');

            return res.status(200).json({msg: 'Usuario insertado.'});
        } catch (erno) {
            return res.status(400).json({msg: 'Error al insertar los datos.',error: erno});
        } finally {
            if(pool) pool.close()
        }
    } else {

        return res.status(400).json({msg: 'Solicitud incorrecta. Proporciona todos los campos.'});
    }     
}