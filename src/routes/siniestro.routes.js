import { Router } from "express";
import { getSiniestro, getSiniestrorById, createSiniestro, updateSiniestrorById, deleteSiniestroById } from "../controllers/siniestro.controller";

const router = Router()

router.get('/siniestro/get', getSiniestro);
router.get('/siniestro/getbid/:idSiniestro', getSiniestrorById);
router.post('/siniestro/create/', createSiniestro);
router.put('/siniestro/update/:idSiniestro', updateSiniestrorById);
router.delete('/siniestro/delete/:idSiniestro', deleteSiniestroById);

export default router
