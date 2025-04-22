import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Endpoint de status do sistema
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Testa o status da API
 *     description: Testa o status da API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API rodando.
 */
router.get("/health", (req: Request, res: Response) => {
    let a = 1;

    a = 2;

    console.log(a)
    res.send('Rodando!');
});

export default router;
