import express from "express";

import {
  getProdutos,
  getCompradores,
  getTransacoes,
  getGeografia,
} from "../controllers/clientes.controller.js";

const router = express();

router.get("/produtos", getProdutos);
router.get("/compradores", getCompradores);
router.get("/transacoes", getTransacoes);
router.get("/geografia", getGeografia);

export default router;
