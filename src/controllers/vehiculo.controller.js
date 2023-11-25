import { getConection, sql } from "../database/conection";
import { HTTP_STATUS, MESSAGES } from "../database/status";

export const getVehiculo = async (req,res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT v.idVehiculo, v.idCorralon, c.razonSocial AS nombre_corralon, v.idSiniestro, s.folio AS siniestro_folio , v.idVehiculoTipo, vt.nombre AS vehiculo_tipo, v.matricula, v.matriculaEstado, v.modelo, v.marca, v.color, v.fechaEntrada, v.fechaSalida FROM vehiculo AS v LEFT JOIN siniestro AS s ON v.idSiniestro = s.idSiniestro LEFT JOIN corralon AS c ON v.idCorralon = c.idCorralon LEFT JOIN vehiculo_tipo as vt ON v.idVehiculoTipo = vt.idVehiculoTipo;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }

        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
}

export const createVehiculo = async (req,res) => {
    const { idSiniestro, idCorralon, idVehiculoTipo, matricula, matriculaEstado, modelo, marca, color } = req.body;
    if (idSiniestro && idCorralon && idVehiculoTipo && matricula && matriculaEstado && modelo && marca && color) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('idSiniestro', sql.Int, idSiniestro)
            .input('idCorralon', sql.Int, idCorralon)
            .input('idVehiculoTipo', sql.Int, idVehiculoTipo)
            .input('matricula', sql.VarChar, matricula)
            .input('matriculaEstado', sql.VarChar, matriculaEstado)
            .input('modelo', sql.VarChar, modelo)
            .input('marca', sql.VarChar, marca)
            .input('color', sql.VarChar, color)
            .query('INSERT INTO vehiculo (idSiniestro, idCorralon, idVehiculoTipo, matricula, matriculaEstado, modelo, marca, color, fechaEntrada) VALUES (@idSiniestro, @idCorralon, @idVehiculoTipo, @matricula, @matriculaEstado, @modelo, @marca, @color, SYSDATETIME());');
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error){
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg:MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
                .json({msg:MESSAGES.BAD_REQUEST, content: {
                        'idSiniestro': idSiniestro,
                        'idCorralon': idCorralon,
                        'idVehiculoTipo': idVehiculoTipo,
                        'matricula': matricula,
                        'matriculaEstado': matriculaEstado,
                        'modelo': modelo,
                        'marca': marca,
                        'color': color
                    }
                });
    }    
}

export const getVehiculoById = async (req,res) => {
    const { idVehiculo } = req.params;
    if (idVehiculo){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input("idVehiculo", sql.Int, idVehiculo)
            .query('SELECT v.idVehiculo, v.idCorralon, c.razonSocial AS nombre_corralon, v.idSiniestro, s.folio AS siniestro_folio , v.idVehiculoTipo, vt.nombre AS vehiculo_tipo, v.matricula, v.matriculaEstado, v.modelo, v.marca, v.color, v.fechaEntrada, v.fechaSalida FROM vehiculo AS v LEFT JOIN siniestro AS s ON v.idSiniestro = s.idSiniestro LEFT JOIN corralon AS c ON v.idCorralon = c.idCorralon LEFT JOIN vehiculo_tipo as vt ON v.idVehiculoTipo = vt.idVehiculoTipo WHERE idVehiculo = @idVehiculo;')

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset})
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idVehiculo': idVehiculo || ''}})
    }
}

export const deleteVehiculoById = async (req,res) => {
    const { idVehiculo } = req.params;
    if (idVehiculo){
        try {
            const pool = await getConection();
            await pool.request()
            .input("idVehiculo", sql.Int, idVehiculo)
            .query('DELETE FROM vehiculo WHERE idVehiculo = @idVehiculo')

            return res.status(HTTP_STATUS.DELETE_SUCCES)
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {'idVehiculo': idVehiculo || ''}})
    }
}

export const updateVehiculoById = async (req,res) => {
    const { idVehiculo } = req.params;
     const { idSiniestro, idCorralon, idVehiculoTipo, matricula, matriculaEstado, modelo, marca, color } = req.body;
    
    if (idVehiculo && idSiniestro && idCorralon && idVehiculoTipo && matricula && matriculaEstado && modelo && marca && color) {
        try {
            const pool = await getConection();
            await pool.request()
            .input('idSiniestro', sql.Int, idSiniestro)
            .input('idCorralon', sql.Int, idCorralon)
            .input('idVehiculoTipo', sql.Int, idVehiculoTipo)
            .input('matricula', sql.VarChar, matricula)
            .input('matriculaEstado', sql.VarChar, matriculaEstado)
            .input('modelo', sql.VarChar, modelo)
            .input('marca', sql.VarChar, marca)
            .input('color', sql.VarChar, color)
            .input('idVehiculo', sql.Int, idVehiculo)
            .query('UPDATE vehiculo SET idsiniestro = @idsiniestro, idCorralon = @idCorralon, idVehiculoTipo = @idVehiculoTipo, matricula = @matricula, matriculaEstado = @matriculaEstado, modelo = @modelo, marca = @marca, color = @color WHERE idVehiculo = @idVehiculo;');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error})
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content: {
                "idVehiculo": idVehiculo,
                "idSiniestro": idSiniestro,
                "idCorralon": idCorralon,
                "idVehiculoTipo": idVehiculoTipo,
                "matricula": matricula,
                "matriculaEstado": matriculaEstado,
                "modelo": modelo,
                "marca": marca,
                "color": color
            }
        })
    }
}