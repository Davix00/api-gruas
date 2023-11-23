import { Router } from "express";
import { getManiobras, getManiobraById, createManiobra, deleteManiobraById, updateManiobraById } from "../controllers/maniobra.controller";

const router = Router()

router.get('/maniobra/get', getManiobras);
router.get('/maniobra/getbid/:idManiobra', getManiobraById);
router.post('/maniobra/create', createManiobra);
router.delete('/maniobra/delete/:idManiobra', deleteManiobraById);
router.put('/maniobra/update/:idManiobra', updateManiobraById);

export default router