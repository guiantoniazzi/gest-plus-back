import { Router, Request, Response } from "express";
import { ProjetoService } from "../service/projetoService";
import { TokenService } from "../service/tokenService";
import { Funcionalidade } from "../enums/funcionalidade";
import ProjetoDTO from "../dto/projetoDTO";

/**
 * @swagger
 * tags:
 *   name: Projeto
 *   description: Endpoint de projeto
 */

export default class ProjetoController {
    public router = Router();
    private projetoService: ProjetoService;

    constructor() {
        this.projetoService = new ProjetoService();
    }

    inicializarRotas() {
        try {
            /**
             * @swagger
             * /api/projeto/getAll:
             *   get:
             *     summary: Retorna todos os projetos
             *     description: Retorna uma lista de todos os projetos cadastrados no sistema.
             *     tags: [Projeto]
             *     parameters:
             *       - in: query
             *         name: empresaSelecionada
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da empresa selecionada
             *     responses:
             *       200:
             *         description: Lista de projetos.
             */
            this.router.get(
                "/getAll",
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
                        const isValid = await tokenService.validarToken(token, Funcionalidade["Consultar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }
                        const projetos = await this.projetoService.getAll(empresaSelecionada);
                        return res.status(200).json(projetos);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao buscar projetos" });
                    }
                }
            );

            /**
             * @swagger
             * /api/projeto/getHistorico:
             *   get:
             *     summary: Retorna o histórico do projeto
             *     description: Retorna uma lista do histórico do projeto.
             *     tags: [Projeto]
             *     parameters:
             *       - in: query
             *         name: empresaSelecionada
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da empresa selecionada
             *       - in: query
             *         name: cdProj
             *         schema:
             *           type: integer
             *         required: true
             *         description: Código do projeto
             *     responses:
             *       200:
             *         description: Lista de histórico do projeto.
             */
            this.router.get(
                "/getHistorico",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);
                        const cdProj = parseInt(req.query.cdProj as string);

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }

                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }

                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(token, Funcionalidade["Consultar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }
                        const projetos = await this.projetoService.getHistorico(cdProj);
                        return res.status(200).json(projetos);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao buscar projetos" });
                    }
                }
            );

            /**
             * @swagger
             * /api/projeto/cadastrar:
             *   post:
             *     summary: Cadastrar um novo projeto
             *     description: Cadastra um novo projeto no sistema.
             *     tags: [Projeto]
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
             *             $ref: '#/components/schemas/ProjetoDTO'
             *     responses:
             *       201:
             *         description: Projeto cadastrado com sucesso.
             *       400:
             *         description: Dados inválidos.
             *       500:
             *         description: Erro ao cadastrar projeto.
             */
            this.router.post(
                "/cadastrar",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);
                        const projeto = req.body as ProjetoDTO;

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }
                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }

                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(token, Funcionalidade["Gerenciar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }
                        const dadosToken = await tokenService.descripToken(token);

                        const result = await this.projetoService.cadastrarProjeto(
                            projeto,
                            dadosToken,
                            empresaSelecionada
                        );
                        return res.status(201).json(result);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao cadastrar projeto" });
                    }
                }
            );

            /**
             * @swagger
             * /api/projeto/alterar:
             *   put:
             *     summary: Alterar um projeto
             *     description: Altera um projeto do sistema.
             *     tags: [Projeto]
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
             *             $ref: '#/components/schemas/ProjetoDTO'
             *     responses:
             *       200:
             *         description: Projeto alterado com sucesso.
             *       400:
             *         description: Dados inválidos.
             *       500:
             *         description: Erro ao alterar projeto.
             */
            this.router.put(
                "/alterar",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);
                        const projeto = req.body as ProjetoDTO;

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }
                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }

                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(token, Funcionalidade["Gerenciar projeto"], empresaSelecionada);
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }
                        const dadosToken = await tokenService.descripToken(token);

                        const result = await this.projetoService.alterarProjeto(
                            projeto,
                            dadosToken,
                            empresaSelecionada
                        );
                        return res.status(200).json(result);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao alterar projeto" });
                    }
                }
            );
        } catch (error) {
            throw error;
        }
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjetoDTO:
 *       type: object
 *       properties:
 *         cdProj:
 *           type: number
 *           example: 1
 *         cdEmpresa:
 *           type: number
 *           example: 2
 *         cdCliente:
 *           type: number
 *           example: 3
 *         idProjInterno:
 *           type: string
 *           example: "INT-001"
 *         idProjCliente:
 *           type: string
 *           example: "CLI-001"
 *         tpProj:
 *           type: string
 *           example: "A"
 *         nomeProj:
 *           type: string
 *           example: "Projeto Exemplo"
 *         cdRespProj:
 *           type: number
 *           example: 10
 *         dtInicioAvaliacao:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         dtInicioNegociacao:
 *           type: string
 *           format: date
 *           example: "2025-01-10"
 *         dtInicioPrevista:
 *           type: string
 *           format: date
 *           example: "2025-02-01"
 *         dtFimPrevista:
 *           type: string
 *           format: date
 *           example: "2025-03-01"
 *         qtdHrProj:
 *           type: number
 *           example: 100
 *         vlrHrProj:
 *           type: number
 *           example: 150.5
 *         vlrBaseProj:
 *           type: number
 *           example: 15000.0
 *         vlrDescontoComercial:
 *           type: number
 *           example: 1000.0
 *         vlrAcrescimoProjeto:
 *           type: number
 *           example: 500.0
 *         vlrFinalProjeto:
 *           type: number
 *           example: 14500.0
 *         dtInicioProj:
 *           type: string
 *           format: date
 *           example: "2025-02-05"
 *         dtFimProj:
 *           type: string
 *           format: date
 *           example: "2025-04-01"
 *         vlrFaturado:
 *           type: number
 *           example: 5000.0
 *         situacaoProj:
 *           type: number
 *           example: 1
 *         usuInclusao:
 *           type: string
 *           example: "admin"
 *         dtHrInclusao:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T10:00:00Z"
 *         usuAlteracao:
 *           type: string
 *           example: "admin"
 *         dtHrAlteracao:
 *           type: string
 *           format: date-time
 *           example: "2025-01-02T10:00:00Z"
 */