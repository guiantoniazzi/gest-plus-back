import express from 'express';
import { setupSwagger } from './src/swagger/swagger';
import routes from './src/controller/health';

const app = express();
app.use(express.json());

app.use(routes);

setupSwagger(app);

const port = 3030;

app.listen(port, () => console.log(`Documentação em: http://localhost:${port}/swagger`));