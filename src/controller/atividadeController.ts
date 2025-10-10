import { Router, Request, Response } from "express";
import { AtividadeService } from "../service/atividadeService";
import { TokenService } from "../service/tokenService";
import { Funcionalidade } from "../enums/funcionalidade";

/**
 * @swagger
 * tags:
 *   name: Atividades
 *   description: Endpoint de atividades
 */

export default class AtividadesController {
    public router = Router();
    private atividadeService: AtividadeService;

    constructor() {
        this.atividadeService = new AtividadeService();
    }

    inicializarRotas() {
        try {
            /**
             * @swagger
             * /api/atividade/getByProj:
             *   get:
             *     summary: Retorna todas as atividades do projeto
             *     description: Retorna uma lista de todas as atividades, pessoas alocadas e status.
             *     tags: [Atividades]
             *     parameters:
             *       - in: query
             *         name: empresaSelecionada
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da empresa selecionada
             *       - in: query
             *         name: idProj
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID do projeto selecionado
             *     responses:
             *       200:
             *         description: Lista de atividades.
             */
            this.router.get(
                "/getByProj",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);
                        const idProj = parseInt(req.query.idProj as string);

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }
                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }
                        if (!idProj || isNaN(idProj)) {
                            return res.status(400).json({ message: "Informe o projeto selecionado" });
                        }

                        const tokenService = new TokenService();
                        const isValid = tokenService.validarToken(token, Funcionalidade["Consultar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }

                        const atividades = await this.atividadeService.getByIdProj(idProj, empresaSelecionada);
                        return res.status(200).json(atividades).send();
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao buscar atividades" });
                    }
                }
            );

            /**
             * @swagger
             * /api/atividade/getById:
             *   get:
             *     summary: Retorna uma atividade pelo ID
             *     description: Retorna uma atividade, pessoas alocadas e status pelo ID.
             *     tags: [Atividades]
             *     parameters:
             *       - in: query
             *         name: cdAtiv
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da atividade
             *       - in: query
             *         name: empresaSelecionada
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da empresa selecionada
             *     responses:
             *       200:
             *         description: Atividade encontrada.
             */
            this.router.get(
                "/getById",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);
                        const cdAtiv = parseInt(req.query.cdAtiv as string);

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }
                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }
                        if (!cdAtiv || isNaN(cdAtiv)) {
                            return res.status(400).json({ message: "Informe o ID da atividade" });
                        }

                        const tokenService = new TokenService();
                        const isValid = tokenService.validarToken(token, Funcionalidade["Consultar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }

                        const atividade = await this.atividadeService.getById(cdAtiv);
                        return res.status(200).json(atividade).send();
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao buscar atividade" });
                    }
                }
            );

            /**
 * @swagger
 * /api/atividade/alterar:
 *   put:
 *     summary: Alterar uma atividade
 *     description: Altera os dados de uma atividade.
 *     tags: [Atividades]
 *     parameters:
 *       - in: query
 *         name: empresaSelecionada
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da empresa selecionada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cdAtiv:
 *                 type: integer
 *                 example: 1
 *               cdProj:
 *                 type: integer
 *                 example: 1
 *               nomeAtiv:
 *                 type: string
 *                 example: "Desenvolvimento"
 *               dtInicioPrevista:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-01"
 *               dtFimPrevista:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-10"
 *               qtdHrPrevista:
 *                 type: integer
 *                 example: 40
 *               qtdHr:
 *                 type: integer
 *                 example: 10
 *               vlrAtiv:
 *                 type: number
 *                 format: float
 *                 example: 1500.50
 *               dtInicioAtiv:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-02"
 *               dtFimAtiv:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-09"
 *               situacaoAtiv:
 *                 type: integer
 *                 example: 2
 *               usuAlteracao:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Atividade alterada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro ao alterar atividade.
 */
            this.router.put(
                "/alterar",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }
                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }

                        const tokenService = new TokenService();
                        const isValid = tokenService.validarToken(token, Funcionalidade["Gerenciar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }

                        await this.atividadeService.alterar(req.body);
                        return res.status(200).json().send();
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao alterar atividade" });
                    }
                }
            );

            /**
 * @swagger
 * /api/atividade/alocar:
 *   post:
 *     summary: Alocar pessoa em atividade
 *     description: Aloca uma pessoa em uma atividade.
 *     tags: [Atividades]
 *     parameters:
 *       - in: query
 *         name: empresaSelecionada
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da empresa selecionada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cdPessoa:
 *                 type: integer
 *                 example: 1
 *               cdAtiv:
 *                 type: integer
 *                 example: 2
 *               dtInicio:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-01"
 *               dtFim:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-10"
 *               qtdHr:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       200:
 *         description: Pessoa alocada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro ao alocar pessoa.
 */
            this.router.post(
                "/alocar",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }
                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }

                        const tokenService = new TokenService();
                        const isValid = tokenService.validarToken(token, Funcionalidade["Gerenciar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }

                        const dadosToken = await tokenService.descripToken(token);

                        await this.atividadeService.alocar(req.body, dadosToken);
                        return res.status(200).json().send();
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao alocar pessoa" });
                    }
                }
            );

            /**
             * @swagger
             * /api/atividade/desalocar:
             *   delete:
             *     summary: Desalocar pessoa de atividade
             *     description: Remove a alocação de uma pessoa em uma atividade.
             *     tags: [Atividades]
             *     parameters:
             *       - in: query
             *         name: cdPessoa
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da pessoa
             *       - in: query
             *         name: cdAtiv
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da atividade
             *       - in: query
             *         name: empresaSelecionada
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da empresa selecionada
             *     responses:
             *       200:
             *         description: Pessoa desalocada com sucesso.
             *       400:
             *         description: Dados inválidos.
             *       500:
             *         description: Erro ao desalocar pessoa.
             */
            this.router.delete(
                "/desalocar",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);
                        const cdPessoa = parseInt(req.query.cdPessoa as string);
                        const cdAtiv = parseInt(req.query.cdAtiv as string);

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }
                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }
                        if (!cdPessoa || isNaN(cdPessoa) || !cdAtiv || isNaN(cdAtiv)) {
                            return res.status(400).json({ message: "Informe os IDs da pessoa e atividade" });
                        }

                        const tokenService = new TokenService();
                        const isValid = tokenService.validarToken(token, Funcionalidade["Gerenciar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }

                        await this.atividadeService.desalocar(cdPessoa, cdAtiv);
                        return res.status(200).json().send();
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao desalocar pessoa" });
                    }
                }
            );

            /**
 * @swagger
 * /api/atividade/alterarAlocacao:
 *   put:
 *     summary: Alterar alocação de pessoa em atividade
 *     description: Altera os dados da alocação de uma pessoa em uma atividade.
 *     tags: [Atividades]
 *     parameters:
 *       - in: query
 *         name: empresaSelecionada
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da empresa selecionada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cdPessoa:
 *                 type: integer
 *                 example: 1
 *               cdAtiv:
 *                 type: integer
 *                 example: 2
 *               dtInicio:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-01"
 *               dtFim:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-15"
 *               qtdHr:
 *                 type: integer
 *                 example: 10
 *               usuAlteracao:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Alocação alterada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro ao alterar alocação.
 */
            this.router.put(
                "/alterarAlocacao",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }
                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }

                        const tokenService = new TokenService();
                        const isValid = tokenService.validarToken(token, Funcionalidade["Gerenciar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }

                        await this.atividadeService.alterarAlocacao(req.body);
                        return res.status(200).json().send();
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao alterar alocação" });
                    }
                }
            );
        } catch (error) {
            throw error;
        }

        /**
 * @swagger
 * /api/atividade/cadastrar:
 *   post:
 *     summary: Cadastrar uma nova atividade
 *     description: Cadastra uma nova atividade no sistema.
 *     tags: [Atividades]
 *     parameters:
 *       - in: query
 *         name: empresaSelecionada
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da empresa selecionada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cdProj:
 *                 type: integer
 *                 example: 1
 *               nomeAtiv:
 *                 type: string
 *                 example: "Desenvolvimento"
 *               dtInicioPrevista:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-01"
 *               dtFimPrevista:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-10"
 *               qtdHrPrevista:
 *                 type: integer
 *                 example: 40
 *               qtdHr:
 *                 type: integer
 *                 example: 10
 *               vlrAtiv:
 *                 type: number
 *                 format: float
 *                 example: 1500.50
 *               dtInicioAtiv:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-02"
 *               dtFimAtiv:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-09"
 *               situacaoAtiv:
 *                 type: integer
 *                 example: 2
 *               usuInclusao:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Atividade cadastrada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro ao cadastrar atividade.
 */
        this.router.post(
            "/cadastrar",
            async (req: Request, res: Response): Promise<any> => {
                try {
                    const token = req.headers.cookie?.split("=")[1];
                    const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);

                    if (!token) {
                        return res.status(401).json({ message: "Token não fornecido" });
                    }
                    if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                        return res.status(400).json({ message: "Informe a empresa selecionada" });
                    }

                    const tokenService = new TokenService();
                    const isValid = tokenService.validarToken(token, Funcionalidade["Gerenciar projeto"], empresaSelecionada);
                    if (!isValid) {
                        return res.status(401).json({ message: "Token inválido" });
                    }

                    const dadosToken = await tokenService.descripToken(token);

                    const insert = await this.atividadeService.cadastrar(req.body, dadosToken);
                    return res.status(201).json(insert).send();
                } catch (error) {
                    return res.status(500).json({ message: "Erro ao cadastrar atividade" });
                }
            }
        );
    }
}