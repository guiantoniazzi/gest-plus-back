"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
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
router.get("/health", (req, res) => {
    res.send('Rodando!');
});
exports.default = router;
