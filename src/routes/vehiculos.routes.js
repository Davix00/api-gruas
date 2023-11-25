import { Router } from "express";
import { getVehiculo, getVehiculoById, createVehiculo, updateVehiculoById, deleteVehiculoById } from "../controllers/vehiculo.controller";

const router = Router()

router.get('/vehiculo/get', getVehiculo);
router.get('/vehiculo/getbid/:idVehiculo', getVehiculoById);
router.post('/vehiculo/create', createVehiculo);
router.put('/vehiculo/update/:idVehiculo', updateVehiculoById);
router.delete('/vehiculo/delete/:idVehiculo', deleteVehiculoById);

export default router

