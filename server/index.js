import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import conectarComMongoDB from "./db/conectarComMongoDB.js";

import clienteRoutes from "./routes/cliente.routes.js";
import geralRoutes from "./routes/geral.routes.js";
import gerenciamentoRoutes from "./routes/gerenciamento.routes.js";
import vendasRoutes from "./routes/vendas.routes.js";

//data imports
import Usuario from "./models/Usuario.model.js";
import Produto from "./models/Produto.model.js";
import ProdutoEstatisticas from "./models/ProdutoEstatisticas.model.js";
import Transacao from "./models/Transacao.model.js";
import EstatisticaGeral from "./models/EstatisticaGeral.model.js";
import EstatisticaAfiliados from "./models/EstatisticaAfiliado.model.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

//Configurações
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Rotas
app.use("/cliente", clienteRoutes);
app.use("/geral", geralRoutes);
app.use("/gerenciamento", gerenciamentoRoutes);
app.use("/vendas", vendasRoutes);

//Mongoose
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  conectarComMongoDB();
  console.log(`Server Running on port ${PORT}`);

  //Populando a collection de usuário.
  //Usar apenas 1 vez.
  // Usuario.insertMany(dataUser);
  // Produto.insertMany(dataProduct);
  // ProdutoEstatisticas.insertMany(dataProductStat);
  // Transacao.insertMany(dataTransaction);
  // EstatisticaGeral.insertMany(dataOverallStat);
  // EstatisticaAfiliados.insertMany(dataAffiliateStat);
});
