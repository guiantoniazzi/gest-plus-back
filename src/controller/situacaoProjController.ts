import { Router, Request, Response } from "express";
import { SituacaoProjService } from "../service/situacaoProjService";

/**
 * @swagger
 * tags:
 *   name: SituacaoProj
 *   description: Endpoint de situação de projeto
 */

export default class SituacaoProjController {
    public router = Router();
    private situacaoProjService: SituacaoProjService;

    constructor() {
        this.situacaoProjService = new SituacaoProjService();
    }

    inicializarRotas() {
        try {
            /**
             * @swagger
             * /api/situacaoProj/getAll:
             *   get:
             *     summary: Retorna todas as situações de projeto
             *     description: Retorna uma lista de todas as situações de projeto cadastradas no sistema.
             *     tags: [SituacaoProj]
             *     responses:
             *       200:
             *         description: Lista de situações de projeto.
             */
            this.router.get(
                "/getAll",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const situacoes = await this.situacaoProjService.getAll();
                        return res.status(200).json(situacoes);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao buscar situações de projeto" });
                    }
                }
            );
        } catch (error) {
            throw error;
        }
    }
}