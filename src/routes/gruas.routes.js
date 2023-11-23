import {Router} from 'express'
import {getGruas, getGruaById, createGrua, deleteUsuario, updateGruaById} from '../controllers/gruas.controller'

const router = Router()

router.get('/gruas/get', getGruas);
router.get('/gruas/getbid/:idGrua', getGruaById);
router.post('/gruas/create', createGrua);
router.delete('/gruas/delete/:idGrua', deleteUsuario);
router.put('/gruas/update/:idGrua', updateGruaById);

export default router