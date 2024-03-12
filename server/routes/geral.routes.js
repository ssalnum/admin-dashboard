import express from "express";
import { getUsuario } from "../controllers/geral.controller.js";
import { getInformacoesDashboard } from "../controllers/geral.controller.js";

const router = express();

router.get("/usuario/:id", getUsuario);
router.get("/dashboard", getInformacoesDashboard);

export default router;
