"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginService_1 = require("../service/loginService");
const login_1 = require("../model/login");
/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Endpoint de autenticação do sistema
*/
class LoginController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.loginService = new loginService_1.LoginService();
    }
    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Login do Usuário
     *     description: Autentica usuário retornando token
     *     tags: [Login]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               usuario:
     *                 type: string
     *                 example: gui
     *               senha:
     *                 type: string
     *                 example: 123456
     *     responses:
     *       200:
     *         description: Token de autenticação.
     */
    inicializarRotas() {
        try {
            this.router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const { usuario, senha } = req.body;
                if (!usuario) {
                    return res.status(400).json({ message: "Informe o usuário" });
                }
                var login = new login_1.Login();
                login.usuario = usuario;
                login.senha = senha;
                var permissoesLogin = yield this.loginService.validarCredenciais(login);
                return res.status(200).cookie("token", this.loginService.gerarToken(permissoesLogin), {
                    httpOnly: true,
                    // secure: true,
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60 * 24
                }).json(permissoesLogin).send();
            }));
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = LoginController;
