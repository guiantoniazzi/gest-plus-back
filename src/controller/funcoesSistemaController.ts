import { Router, Request, Response } from "express";
import { PerfisAcessoService } from "../service/perfisAcessoService";
import { TokenService } from "../service/tokenService";
import { Funcionalidade } from "../enums/funcionalidade";
import { FuncoesSistemaService } from "../service/funcoesSistemaService";

/**
 * @swagger
 * tags:
 *   name: FuncoesSistema
 *   description: Endpoint de funções do sistema
 */

export default class FuncoesSistemaController {
    public router = Router();
    private funcoesSistemaService: FuncoesSistemaService;

    constructor() {
        this.funcoesSistemaService = new FuncoesSistemaService();
    }

    inicializarRotas() {
        try {
            /**
             * @swagger
             * /api/funcoesSistema/getAllActive:
             *   get:
             *     summary: Retorna todas as funções do sistema ativas
             *     description: Retorna uma lista de todas as funções do sistema ativas.
             *     tags: [FuncoesSistema]
             *     responses:
             *       200:
             *         description: Lista de funções do sistema.
             */
            this.router.get("/getAllActive", async (req: Request, res: Response): Promise<any> => {
                try {
                    const ret = await this.funcoesSistemaService.getAllFuncoesActive();
                    return res.status(200).json(ret);
                } catch (error) {
                    return res.status(500).json({ message: "Erro ao buscar perfis de acesso" });
                }
            });

        } catch (error) {
            throw error;
        }
    }
}