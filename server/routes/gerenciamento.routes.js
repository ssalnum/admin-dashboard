import express from "express";

import { getAdmins } from "../controllers/gerenciamento.controller.js";
import { getUsuarioPerformance } from "../controllers/gerenciamento.controller.js";

const router = express();

router.get("/admins", getAdmins);
router.get("/performance/:id", getUsuarioPerformance);

export default router;
