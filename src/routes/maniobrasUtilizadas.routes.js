import { Router } from "express";
import { getManiobrasUtilizdas, getManiobrasUtilizadasById, createManiobrasUtilizadas, updateManiobraById, deleteManiobraUtilizadaById } from "../controllers/maniobraUtilizada.controller";

const router = Router()

router.get('/maniobrasu/get', getManiobrasUtilizdas);
router.get('/maniobrasu/getbid/:id', getManiobrasUtilizadasById);
router.post('/maniobrasu/create', createManiobrasUtilizadas);
router.put('/maniobrasu/update/:id', updateManiobraById);
router.delete('/maniobrasu/delete/:id', deleteManiobraUtilizadaById);

export default router
