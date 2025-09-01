import { Router, Request, Response } from "express";
import { CargoService } from "../service/cargoService";
import { TokenService } from "../service/tokenService";
import { Funcionalidade } from "../enums/funcionalidade";

/**
 * @swagger
 * tags:
 *   name: Cargo
 *   description: Endpoint de cargos
 */

export default class CargoController {
    public router = Router();
    private cargoService: CargoService;

    constructor() {
        this.cargoService = new CargoService();
    }

    inicializarRotas() {
        try {
            /**
             * @swagger
             * /api/cargo/getAll:
             *   get:
             *     summary: Retorna todos os cargos
             *     description: Retorna uma lista de todos os cargos cadastrados no sistema.
             *     tags: [Cargo]
             *     parameters:
             *       - in: query
             *         name: empresaSelecionada
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da empresa selecionada
             *     responses:
             *       200:
             *         description: Lista de cargos.
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
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Consultar cargo"],
                            empresaSelecionada
                        );
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }
                        const cargos = await this.cargoService.getAll();
                        return res.status(200).json(cargos);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao buscar cargos" });
                    }
                }
            );

            /**
             * @swagger
             * /api/cargo/getById:
             *   get:
             *     summary: Retorna um cargo pelo ID
             *     description: Retorna um cargo específico pelo seu código.
             *     tags: [Cargo]
             *     parameters:
             *       - in: query
             *         name: empresaSelecionada
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da empresa selecionada
             *       - in: query
             *         name: cdCargo
             *         schema:
             *           type: integer
             *         required: true
             *         description: Código do cargo
             *     responses:
             *       200:
             *         description: Cargo encontrado.
             *       404:
             *         description: Cargo não encontrado.
             */
            this.router.get(
                "/getById",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);
                        const cdCargo = parseInt(req.query.cdCargo as string);

                        if (!token) {
                            return res.status(401).json({ message: "Token não fornecido" });
                        }
                        if (!empresaSelecionada || isNaN(empresaSelecionada)) {
                            return res.status(400).json({ message: "Informe a empresa selecionada" });
                        }
                        if (!cdCargo || isNaN(cdCargo)) {
                            return res.status(400).json({ message: "Informe o código do cargo" });
                        }
                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Consultar cargo"],
                            empresaSelecionada
                        );
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }
                        const cargo = await this.cargoService.getById(cdCargo);
                        if (!cargo) {
                            return res.status(404).json({ message: "Cargo não encontrado" });
                        }
                        return res.status(200).json(cargo);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao buscar cargo" });
                    }
                }
            );

            /**
             * @swagger
             * /api/cargo/cadastrar:
             *   post:
             *     summary: Cadastrar um novo cargo
             *     description: Cadastra um novo cargo no sistema.
             *     tags: [Cargo]
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
             *               descCargo:
             *                 type: string
             *                 example: "Analista"
             *               ativo:
             *                 type: boolean
             *                 example: true
             *     responses:
             *       201:
             *         description: Cargo cadastrado com sucesso.
             *       400:
             *         description: Dados inválidos.
             *       500:
             *         description: Erro ao cadastrar cargo.
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
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Gerenciar cargo"],
                            empresaSelecionada
                        );
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }
                        const dadosToken = await tokenService.descripToken(token);
                        const { descCargo, ativo } = req.body;

                        if (!descCargo || ativo === undefined) {
                            return res.status(400).json({ message: "Dados inválidos. Verifique os campos enviados." });
                        }

                        const cargo = {
                            descCargo,
                            ativo: ativo ? 1 : 0,
                            usuInclusao: dadosToken.cdUsuario,
                            dtHrInclusao: new Date(),
                        };

                        const novoCargo = await this.cargoService.cadastrarCargo(cargo);
                        return res.status(201).json(novoCargo);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao cadastrar cargo" });
                    }
                }
            );

            /**
             * @swagger
             * /api/cargo/alterar:
             *   put:
             *     summary: Alterar um cargo
             *     description: Altera um cargo do sistema.
             *     tags: [Cargo]
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
             *               cdCargo:
             *                 type: number
             *                 example: 1
             *               descCargo:
             *                 type: string
             *                 example: "Analista"
             *               ativo:
             *                 type: boolean
             *                 example: true
             *     responses:
             *       200:
             *         description: Cargo alterado com sucesso.
             *       400:
             *         description: Dados inválidos.
             *       500:
             *         description: Erro ao alterar cargo.
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
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Gerenciar cargo"],
                            empresaSelecionada
                        );
                        if (!isValid) {
                            return res.status(401).json({ message: "Token inválido" });
                        }
                        const dadosToken = await tokenService.descripToken(token);
                        const { cdCargo, descCargo, ativo } = req.body;

                        if (!cdCargo || !descCargo || ativo === undefined) {
                            return res.status(400).json({ message: "Dados inválidos. Verifique os campos enviados." });
                        }

                        const cargo = {
                            cdCargo,
                            descCargo,
                            ativo: ativo ? 1 : 0,
                            usuAlteracao: dadosToken.cdUsuario,
                            dtHrAlteracao: new Date(),
                        };

                        const cargoAlterado = await this.cargoService.alterarCargo(cargo);
                        return res.status(200).json(cargoAlterado);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao alterar cargo" });
                    }
                }
            );
        } catch (error) {
            throw error;
        }
    }
}