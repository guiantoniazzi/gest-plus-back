import express from 'express';
import { setupSwagger } from './src/swagger/swagger';
import health from './src/controller/health';
import LoginController from './src/controller/loginController';

const cors = require('cors');
const app = express();

app.use(cors({credentials: true, origin: true}));

app.use(express.json());

const loginController = new LoginController();

loginController.inicializarRotas();

app.use(
    health, 
    loginController.router
);

setupSwagger(app);

const port = 3030;

app.listen(port, () => console.log(`Documentação em: http://localhost:${port}/swagger`));