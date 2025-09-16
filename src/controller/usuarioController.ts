import { Router, Request, Response } from "express";
import { UsuarioService } from "../service/usuarioService";
import { TokenService } from "../service/tokenService";
import { Funcionalidade } from "../enums/funcionalidade";

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Endpoint de usuários
 */
export default class UsuarioController {
    public router = Router();
    private usuarioService: UsuarioService;

    constructor() {
        this.usuarioService = new UsuarioService();
    }

    inicializarRotas() {
        try {
            /**
             * @swagger
             * /api/usuario/getAll:
             *   get:
             *     summary: Retorna todos os usuários
             *     tags: [Usuario]
             *     parameters:
             *       - in: query
             *         name: empresaSelecionada
             *         schema:
             *           type: integer
             *         required: true
             *         description: ID da empresa selecionada
             *     responses:
             *       200:
             *         description: Lista de usuários.
             */
            this.router.get(
                "/getAll",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);

                        if (!token) return res.status(401).json({ message: "Token não fornecido" });
                        if (!empresaSelecionada || isNaN(empresaSelecionada))
                            return res.status(400).json({ message: "Informe a empresa selecionada" });

                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Consultar usuário"],
                            empresaSelecionada
                        );
                        if (!isValid) return res.status(401).json({ message: "Token inválido" });

                        const usuarios = await this.usuarioService.getAll();
                        return res.status(200).json(usuarios);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao buscar usuários" });
                    }
                }
            );

            /**
             * @swagger
             * /api/usuario/cadastrar:
             *   post:
             *     summary: Cadastrar um novo usuário
             *     tags: [Usuario]
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               cdUsuario:
             *                 type: string
             *                 example: "USR0001"
             *               cdPessoa:
             *                 type: number
             *                 example: 123
             *               senha:
             *                 type: string
             *                 example: "123456"
             *               ativo:
             *                 type: boolean
             *                 example: true
             *               dtValid:
             *                 type: Date
             *                 example: 2026-01-01
             *     responses:
             *       201:
             *         description: Usuário cadastrado com sucesso.
             */
            this.router.post(
                "/cadastrar",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];

                        if (!token) return res.status(401).json({ message: "Token não fornecido" });

                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Gerenciar usuário"],
                        );
                        
                        if (!isValid) return res.status(401).json({ message: "Token inválido" });

                        const dadosToken = await tokenService.descripToken(token);
                        const { cdUsuario, cdPessoa, senha, ativo, dtValid, idsEmpresas, perfilAcesso } = req.body;

                        if (!cdUsuario || !cdPessoa || !senha || ativo === undefined || !idsEmpresas || idsEmpresas.length === 0 || !perfilAcesso)
                            return res.status(400).json({ message: "Dados inválidos" });

                        const usuario = {
                            cdUsuario,
                            cdPessoa,
                            senha,
                            ativo: ativo ? 1 : 0,
                            dtValid: dtValid || null,
                            usuInclusao: dadosToken.cdUsuario,
                            dtHrInclusao: new Date(),
                        };

                        const novoUsuario = await this.usuarioService.cadastrarUsuario(usuario);
                        novoUsuario.dataValues.cdPerfil = perfilAcesso;
                        for (const cdEmpresa of idsEmpresas) {
                            novoUsuario.dataValues.cdEmpresa = cdEmpresa; // Adiciona o cdEmpresa ao objeto do usuário
                            await this.usuarioService.cadastrarUsuarioEmpresa(novoUsuario.dataValues);
                        }
                        return res.status(201).json(novoUsuario);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao cadastrar usuário" });
                    }
                }
            );

            /**
             * @swagger
             * /api/usuario/alterar:
             *   put:
             *     summary: Alterar um usuário
             *     tags: [Usuario]
             *     parameters:
             *       - in: query
             *         name: empresaSelecionada
             *         schema:
             *           type: integer
             *         required: true
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               cdUsuario:
             *                 type: string
             *               cdPessoa:
             *                 type: number
             *               senha:
             *                 type: string
             *               ativo:
             *                 type: boolean
             *               dtValid:
             *                 type: string
             *                 format: date
             *     responses:
             *       200:
             *         description: Usuário alterado com sucesso.
             */
            this.router.put(
                "/alterar",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];
                        const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);

                        if (!token) return res.status(401).json({ message: "Token não fornecido" });
                        if (!empresaSelecionada || isNaN(empresaSelecionada))
                            return res.status(400).json({ message: "Informe a empresa selecionada" });

                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Gerenciar usuário"],
                            empresaSelecionada
                        );
                        if (!isValid) return res.status(401).json({ message: "Token inválido" });

                        const dadosToken = await tokenService.descripToken(token);
                        const { cdUsuario, cdPessoa, senha, ativo, dtValid } = req.body;

                        if (!cdUsuario || !cdPessoa || !senha || ativo === undefined)
                            return res.status(400).json({ message: "Dados inválidos" });

                        const usuario = {
                            cdUsuario,
                            cdPessoa,
                            senha,
                            ativo: ativo ? 1 : 0,
                            dtValid: dtValid || null,
                            usuAlteracao: dadosToken.cdUsuario,
                            dtHrAlteracao: new Date(),
                        };

                        const usuarioAlterado = await this.usuarioService.alterarUsuario(usuario);
                        return res.status(200).json(usuarioAlterado);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao alterar usuário" });
                    }
                }
            );
        } catch (error) {
            throw error;
        }
    }
}
