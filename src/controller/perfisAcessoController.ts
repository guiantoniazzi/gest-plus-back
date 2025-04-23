import { Router, Request, Response } from "express";
import { LoginService } from "../service/loginService";
import { Login } from "../model/login";
import { PerfisAcessoService } from "../service/perfisAcessoService";
import { TokenService } from "../service/tokenService";

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
			 * /getPerfisComFuncoes:
			 *   get:
			 *     summary: Retorna todas os perfis de acesso com suas respectivas funções
			 *     description: Retorna uma lista de todos perfis de acesso cadastrados no sistema com suas respectivas funções.
			 *     tags: [PerfisAcesso]
			 *     responses:
			 *       200:
			 *         description: Lista de perfis de acesso.
			 */
			this.router.get(
				"/getPerfisComFuncoes",
				async (req: Request, res: Response): Promise<any> => {
					try {
						const token = req.headers.cookie?.split("=")[1];
						if (!token) {
							return res.status(401).json({ message: "Token não fornecido" });
						}
						const tokenService = new TokenService();
						const isValid = tokenService.validarToken(token);
						if (!isValid) {
							return res.status(401).json({ message: "Token inválido" });
						}
						const perfisAcesso = await this.perfisAcessoService.getPerfisComFuncoes();
						return res.status(200).json(perfisAcesso).send();
					} catch (error) {
						return res.status(500).json({ message: "Erro ao buscar perfisAcesso" });
					}
				}
			);
		} catch (error) {
			throw error;
		}
	}
}
