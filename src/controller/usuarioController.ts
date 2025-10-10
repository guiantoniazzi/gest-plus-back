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
             *     responses:
             *       200:
             *         description: Lista de usuários.
             */
            this.router.get(
                "/getAll",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];

                        if (!token) return res.status(401).json({ message: "Token não fornecido" });

                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Consultar usuário"],
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
             * /api/usuario/getAssociacoes:
             *   get:
             *     summary: Retorna todas as associações do usuário
             *     tags: [Usuario]
             *     responses:
             *       200:
             *         description: Lista de associações do usuário.
             */
            this.router.get(
                "/getAssociacoes",
                async (req: Request, res: Response): Promise<any> => {
                    try {
                        const token = req.headers.cookie?.split("=")[1];

                        if (!token) return res.status(401).json({ message: "Token não fornecido" });

                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Consultar usuário"],
                        );
                        if (!isValid) return res.status(401).json({ message: "Token inválido" });

                        const cdUsuario = req.query.cdUsuario;

                        const associacoes = await this.usuarioService.getAssociacoes(cdUsuario);
                        return res.status(200).json(associacoes);
                    } catch (error) {
                        return res.status(500).json({ message: "Erro ao buscar usuários" });
                    }
                }
            );

            /**
             * @swagger
             * /api/usuario/associar:
             *   post:
             *     summary: Associa o funcionário
             *     tags: [Usuario]
             *     responses:
             *       200:
             *         description: Funcionário associado.
             */
            this.router.post(
                "/associar",
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
                        const { cdUsuario, cdEmpresa, cdPerfil, dtValid, ativo } = req.body;

                        if (!cdUsuario || !cdEmpresa || !cdPerfil)
                            return res.status(400).json({ message: "Dados inválidos" });

                        const associacao = {
                            cdUsuario,
                            cdEmpresa,
                            cdPerfil,
                            dtValid,
                            ativo,
                            usuInclusao: dadosToken.cdUsuario,
                            dtHrInclusao: new Date(),
                            usuAlteracao: dadosToken.cdUsuario,
                            dtHrAlteracao: new Date(),
                        };

                        await this.usuarioService.associarUsuario(associacao);
                        return res.status(200);
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
                        const { cdUsuario, cdPessoa, senha, ativo } = req.body;

                        if (!cdUsuario || !cdPessoa || !senha || ativo === undefined)
                            return res.status(400).json({ message: "Dados inválidos" });

                        const usuario = {
                            cdUsuario,
                            cdPessoa,
                            senha,
                            ativo: ativo ? 1 : 0,
                            usuInclusao: dadosToken.cdUsuario,
                            dtHrInclusao: new Date(),
                            usuAlteracao: dadosToken.cdUsuario,
                            dtHrAlteracao: new Date(),
                        };

                        const novoUsuario = await this.usuarioService.cadastrarUsuario(usuario);
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

                        if (!token) return res.status(401).json({ message: "Token não fornecido" });
                        
                        const tokenService = new TokenService();
                        const isValid = await tokenService.validarToken(
                            token,
                            Funcionalidade["Gerenciar usuário"],
                        );
                        if (!isValid) return res.status(401).json({ message: "Token inválido" });

                        const dadosToken = await tokenService.descripToken(token);
                        const { cdUsuario, cdPessoa, senha, ativo  } = req.body;


                         if (!cdUsuario || !cdPessoa || !senha || ativo === undefined )
                            return res.status(400).json({ message: "Dados inválidos" });

                        const usuario = {
                            cdUsuario,
                            cdPessoa,
                            senha,
                            ativo: ativo ? 1 : 0,
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

            /**
             * @swagger
             * /api/usuario/alterarAssociacao:
             *   put:
             *     summary: Alterar uma associação do usuário
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
             *               cdEmpresa:
             *                 type: number
             *               cdPerfil:
             *                 type: number
             *               ativo:
             *                 type: boolean
             *               dtValid:
             *                 type: string
             *                 format: date
             *     responses:
             *       200:
             *         description: Associação alterada com sucesso.
             */
            this.router.put(
                "/alterarAssociacao",
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
                        const { cdUsuario, cdEmpresa, cdPerfil, ativo, dtValid } = req.body;

                         if (!cdUsuario || !cdEmpresa || !cdPerfil || ativo === undefined)
                            return res.status(400).json({ message: "Dados inválidos" });

                        const associacao = {
                            cdUsuario,
                            cdPerfil,
                            cdEmpresa,
                            ativo: ativo ? 1 : 0,
                            dtValid: dtValid || null,
                            usuAlteracao: dadosToken.cdUsuario,
                            dtHrAlteracao: new Date(),
                        };

                        const assocAlterada = await this.usuarioService.alterarAssociacao(associacao);
                        return res.status(200).json(assocAlterada);
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
