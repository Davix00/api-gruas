//aqui se instancian las rutas de las apis
import {Router} from 'express'
import {getUsuarios, newUsuario} from '../controllers/usarios.controller'

const router = Router()

router.get('/usuarios',getUsuarios)
router.get('/usuarios',)
router.post('/usuarios',newUsuario)
router.delete('/usuarios',)
router.put('/usuarios',)

export default router