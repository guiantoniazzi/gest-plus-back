import { Router, Request, Response } from "express";
import { PerfisAcessoService } from "../service/perfisAcessoService";
import { TokenService } from "../service/tokenService";
import { Funcionalidade } from "../enums/funcionalidade";

/**
 * @swagger
 * tags:
 *   name: PerfisAcesso
 *   description: Endpoint de perfis de acesso
 */

export default class PerfisAcessoController {
    public router = Router();
    private perfisAcessoService: PerfisAcessoService;

    constructor() {
        this.perfisAcessoService = new PerfisAcessoService();
    }

    inicializarRotas() {
        try {
            /**
             * @swagger
             * /api/perfisAcesso/getPerfisComFuncoes:
             *   get:
             *     summary: Retorna todos os perfis de acesso com suas respectivas funções
             *     description: Retorna uma lista de todos os perfis de acesso cadastrados no sistema com suas respectivas funções.
             *     tags: [PerfisAcesso]
             *     responses:
             *       200:
             *         description: Lista de perfis de acesso.
             */
            this.router.get("/getPerfisComFuncoes", async (req: Request, res: Response): Promise<any> => {
                try {
                    const token = req.headers.cookie?.split("=")[1];
                    if (!token) {
                        return res.status(401).json({ message: "Token não fornecido" });
                    }
                    const tokenService = new TokenService();
                    const isValid = await tokenService.validarToken(token, Funcionalidade["Consultar perfil de acesso"]);
        
                    if (!isValid) {
                        return res.status(401).json({ message: "Token inválido" });
                    }
                    const perfisAcesso = await this.perfisAcessoService.getPerfisComFuncoes();
                    return res.status(200).json(perfisAcesso);
                } catch (error) {
                    return res.status(500).json({ message: "Erro ao buscar perfis de acesso" });
                }
            });

            /**
             * @swagger
             * /api/perfisAcesso/cadastrar:
             *   post:
             *     summary: Cadastra um novo perfil de acesso
             *     description: Adiciona um novo perfil de acesso ao sistema.
             *     tags: [PerfisAcesso]
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               nomePerfil:
             *                 type: string
             *                 example: "Administrador"
             *               ativo:
             *                 type: boolean
             *                 example: true
             *     responses:
             *       201:
             *         description: Perfil de acesso cadastrado com sucesso.
             *       400:
             *         description: Dados inválidos.
             *       500:
             *         description: Erro ao cadastrar perfil de acesso.
             */
            this.router.post("/cadastrar", async (req: Request, res: Response): Promise<any> => {
                try {
                    const { nomePerfil, ativo } = req.body;
        
                    // Validação básica dos dados
                    if (!nomePerfil || ativo === undefined) {
                        return res.status(400).json({ message: "Dados inválidos. Verifique os campos enviados." });
                    }
        
                    // Chamar o serviço para cadastrar o perfil
                    const novoPerfil = await this.perfisAcessoService.cadastrarPerfil({ nomePerfil, ativo });
                    return res.status(201).json(novoPerfil);
                } catch (error) {
                    console.error("Erro ao cadastrar perfil de acesso:", error);
                    return res.status(500).json({ message: "Erro ao cadastrar perfil de acesso" });
                }
            });
        } catch (error) {
            throw error;
        }
    }
}