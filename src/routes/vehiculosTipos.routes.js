import { Router } from "express";
import { getVehiculosTipos, getVehiculosTiposById, createVehiculoTipo, updateVehiculoTipoById, deleteVehiculoTipo } from "../controllers/tipoVehiculo";

const router = Router()

router.get('/vehiculot/get', getVehiculosTipos);
router.get('/vehiculot/getbid/:idVehiculoTipo', getVehiculosTiposById);
router.post('/vehiculot/create/', createVehiculoTipo)
router.put('/vehiculot/update/:idVehiculoTipo', updateVehiculoTipoById);
router.delete('/vehiculot/delete/:idVehiculoTipo',deleteVehiculoTipo);

export default router


