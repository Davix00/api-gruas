import { Router } from "express";
import { getGruasRespondientes } from "../controllers/gruaRespondiente.controller";

const router = Router()

router.get('/gruasrespondientes/get',getGruasRespondientes);


export default router