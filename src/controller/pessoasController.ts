import { Router, Request, Response } from "express";
import { LoginService } from "../service/loginService";
import { Login } from "../model/login";
import { PessoasService } from "../service/pessoasService";
import { TokenService } from "../service/tokenService";

/**
 * @swagger
 * tags:
 *   name: Pessoas
 *   description: Endpoint de pessoas
 */

export default class PessoasController {
	public router = Router();
	private pessoasService: PessoasService;

	constructor() {
		this.pessoasService = new PessoasService();
	}

	inicializarRotas() {
		try {
			/**
			 * @swagger
			 * /getAll:
			 *   get:
			 *     summary: Retorna todas as pessoas
			 *     description: Retorna uma lista de todas as pessoas cadastradas no sistema.
			 *     tags: [Pessoas]
			 *     responses:
			 *       200:
			 *         description: Lista de pessoas.
			 */
			this.router.get(
				"/getAll",
				async (req: Request, res: Response): Promise<any> => {
					try {
						console.log(req.headers.cookie);
						const token = req.headers.cookie?.split("=")[1];
						if (!token) {
							return res.status(401).json({ message: "Token não fornecido" });
						}
						const tokenService = new TokenService();
						const isValid = tokenService.validarToken(token);
						if (!isValid) {
							return res.status(401).json({ message: "Token inválido" });
						}
						const pessoas = await this.pessoasService.getAll();
						return res.status(200).json(pessoas).send();
					} catch (error) {
						return res.status(500).json({ message: "Erro ao buscar pessoas" });
					}
				}
			);
		} catch (error) {
			throw error;
		}
	}
}
