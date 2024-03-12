import express from "express";

import { getVendas } from "../controllers/vendas.controller.js";

const router = express();

router.get("/vendas", getVendas);

export default router;
