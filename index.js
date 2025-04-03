"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./src/swagger/swagger");
const health_1 = __importDefault(require("./src/controller/health"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(health_1.default);
(0, swagger_1.setupSwagger)(app);
const port = 3030;
app.listen(port, () => console.log(`Documentação em: http://localhost:${port}/swagger`));
