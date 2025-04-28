import express from "express";
import { setupSwagger } from "./src/swagger/swagger";
import health from "./src/controller/health";
import LoginController from "./src/controller/loginController";
import PessoasController from "./src/controller/pessoasController";
import PerfisAcessoController from "./src/controller/perfisAcessoController";
import FuncoesSistemaController from "./src/controller/funcoesSistemaController";

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

app.use(health);

app.use("/api/login", loginController.router);
app.use("/api/pessoas", pessoasController.router);
app.use("/api/perfisAcesso", perfisAcessoController.router);
app.use("/api/funcoesSistema", funcoesSistemaController.router);

setupSwagger(app);

const port = 3030;

app.listen(port, () =>
	console.log(`Documentação em: http://localhost:${port}/swagger`)
);
