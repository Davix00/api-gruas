import { Router } from "express";
import { createGruaRespondiente, deleteGruaRespondienteById, getGruaRespondienteById, getGruasRespondientes, updateGruaRespondienteById } from "../controllers/gruaRespondiente.controller";

const router = Router()

router.get('/gruasrespondientes/get', getGruasRespondientes);
router.post('/gruasrespondientes/create', createGruaRespondiente);
router.get('/gruasrespondientes/getbid/:id', getGruaRespondienteById);
router.delete('/gruasrespondientes/delete/:id', deleteGruaRespondienteById);
router.put('/gruasrespondientes/update/:id', updateGruaRespondienteById);

export default router