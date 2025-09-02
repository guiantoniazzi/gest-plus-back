import express from "express";
import { setupSwagger } from "./src/swagger/swagger";
import health from "./src/controller/health";
import LoginController from "./src/controller/loginController";
import PessoasController from "./src/controller/pessoasController";
import PerfisAcessoController from "./src/controller/perfisAcessoController";
import FuncoesSistemaController from "./src/controller/funcoesSistemaController";

import './src/model/pessoa';
import './src/model/pessoaAux';

import './src/model/associations';
import ProjetoController from "./src/controller/projetoController";
import CargoController from "./src/controller/cargoController";
import SituacaoProjController from "./src/controller/situacaoProjController";
import AtividadeController from "./src/controller/atividadeController";

const cors = require("cors");
const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());

const loginController = new LoginController();
loginController.inicializarRotas();

const pessoasController = new PessoasController();
pessoasController.inicializarRotas();

const perfisAcessoController = new PerfisAcessoController();
perfisAcessoController.inicializarRotas();

const funcoesSistemaController = new FuncoesSistemaController();
funcoesSistemaController.inicializarRotas();

const projetoController = new ProjetoController();
projetoController.inicializarRotas();

const cargoController = new CargoController();
cargoController.inicializarRotas();

const situacaoProjController = new SituacaoProjController();
situacaoProjController.inicializarRotas();

const atividadeController = new AtividadeController();
atividadeController.inicializarRotas();

app.use(health);

app.use("/api/login", loginController.router);
app.use("/api/pessoas", pessoasController.router);
app.use("/api/perfisAcesso", perfisAcessoController.router);
app.use("/api/funcoesSistema", funcoesSistemaController.router);
app.use("/api/projeto", projetoController.router);
app.use("/api/cargo", cargoController.router);
app.use("/api/situacaoProj", situacaoProjController.router);
app.use("/api/atividade", atividadeController.router);

setupSwagger(app);

const port = 3030;

app.listen(port, () =>
	console.log(`Documentação em: http://localhost:${port}/swagger`)
);
