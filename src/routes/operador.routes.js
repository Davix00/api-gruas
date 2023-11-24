import { Router } from "express";
import { getOperador, getOperadorById, createOperador, updateOperadorById, deleteOperadorById } from "../controllers/operador.controller";

const router = Router()

router.get('/operador/get', getOperador);
router.get('/operador/getbid/:idOperador', getOperadorById);
router.post('/operador/create', createOperador);
router.put('/operador/update/:idOperador',updateOperadorById);
router.delete('/operador/delete/:idOperador',deleteOperadorById);

export default router