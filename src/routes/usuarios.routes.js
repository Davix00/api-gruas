import { Router } from 'express'
import {getUsuarios, createUsuario, getUsuarioById, deleteUsuario, countUsuarios, updateUsuarioById, login} from '../controllers/usarios.controller'

const router = Router()

router.get('/usuarios/count', countUsuarios);
router.get('/usuarios/get', getUsuarios);
router.get('/usuarios/login/:nombreDeUsuario/:contrasena', login);
router.get('/usuarios/getbid/:idUsuario', getUsuarioById);
router.post('/usuarios/create', createUsuario);
router.delete('/usuarios/delete/:idUsuario', deleteUsuario);
router.put('/usuarios/update/:idUsuario', updateUsuarioById);

export default router