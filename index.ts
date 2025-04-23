import express from 'express';
import { setupSwagger } from './src/swagger/swagger';
import health from './src/controller/health';
import LoginController from './src/controller/loginController';
import PessoasController from './src/controller/pessoasController';
import PerfisAcessoController from './src/controller/perfisAcessoController';

const cors = require('cors');
const app = express();

app.use(cors({credentials: true, origin: true}));

app.use(express.json());

const loginController = new LoginController();
loginController.inicializarRotas();

const pessoasController = new PessoasController();
pessoasController.inicializarRotas();

const perfisAcessoController = new PerfisAcessoController();
perfisAcessoController.inicializarRotas();

app.use(
    health, 
    loginController.router,
    pessoasController.router,
    perfisAcessoController.router
);

setupSwagger(app);

const port = 3030;

app.listen(port, () => console.log(`Documentação em: http://localhost:${port}/swagger`));