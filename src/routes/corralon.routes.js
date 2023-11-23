import { Router } from 'express';
import { getCorralones, getCorralonById, createCorralon, updateCorralonById, deleteCorralonById } from '../controllers/corralon.controller';

const router = Router()

router.get('/corralon/get', getCorralones);
router.get('/corralon/getbid/:idCorralon', getCorralonById);
router.post('/corralon/create', createCorralon);
router.delete('/corralon/delete/:idCorralon', deleteCorralonById);
router.put('/corralon/update/:idCorralon', updateCorralonById);

export default router