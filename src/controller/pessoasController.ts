import { Router, Request, Response } from "express";
import { PessoasService } from "../service/pessoasService";
import { TokenService } from "../service/tokenService";
import { Funcionalidade } from "../enums/funcionalidade";
import PessoaEntradaDTO from "../dto/pessoaEntradaDTO";

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
			 * /api/pessoas/getAll:
			 *   get:
			 *     summary: Retorna todas as pessoas
			 *     description: Retorna uma lista de todas as pessoas cadastradas no sistema.
			 *     tags: [Pessoas]
			 *     parameters:
			 *       - in: query
			 *         name: empresaSelecionada
			 *         schema:
			 *           type: integer
			 *         required: true
			 *         description: ID da empresa selecionada
			 *     responses:
			 *       200:
			 *         description: Lista de pessoas.
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
						const isValid = tokenService.validarToken(token, Funcionalidade["Consultar pessoa"], empresaSelecionada);
						if (!isValid) {
							return res.status(401).json({ message: "Token inválido" });
						}
						const pessoas = await this.pessoasService.getPessoas(token, empresaSelecionada, true, true, true, true);
						return res.status(200).json(pessoas).send();
					} catch (error) {
						return res.status(500).json({ message: "Erro ao buscar pessoas" });
					}
				}
			);

			/**
			 * @swagger
			 * /api/pessoas/getClientes:
			 *   get:
			 *     summary: Retorna todos os clientes
			 *     description: Retorna uma lista de todas os clientes cadastrados no sistema.
			 *     tags: [Pessoas]
			 *     parameters:
			 *       - in: query
			 *         name: empresaSelecionada
			 *         schema:
			 *           type: integer
			 *         required: true
			 *         description: ID da empresa selecionada
			 *     responses:
			 *       200:
			 *         description: Lista de pessoas.
			 */
			this.router.get(
				"/getClientes",
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
						const isValid = tokenService.validarToken(token, Funcionalidade["Consultar cliente"], empresaSelecionada);
						if (!isValid) {
							return res.status(401).json({ message: "Token inválido" });
						}
						const clientes = await this.pessoasService.getPessoas(token, empresaSelecionada, false, false, true, false);
						return res.status(200).json(clientes).send();
					} catch (error) {
						return res.status(500).json({ message: "Erro ao buscar clientes" });
					}
				}
			);

			/**
			 * @swagger
			 * /api/pessoas/getFuncionarios:
			 *   get:
			 *     summary: Retorna todos os funcionarios
			 *     description: Retorna uma lista de todos os funcionarios cadastrados para o cliente no sistema.
			 *     tags: [Pessoas]
			 *     parameters:
			 *       - in: query
			 *         name: empresaSelecionada
			 *         schema:
			 *           type: integer
			 *         required: true
			 *         description: ID da empresa selecionada
			 *       - in: query
			 *         name: idCliente
			 *         schema:
			 *           type: integer
			 *         required: true
			 *         description: ID do cliente selecionado
			 *     responses:
			 *       200:
			 *         description: Lista de funcionarios.
			 */
			this.router.get(
				"/getFuncionarios",
				async (req: Request, res: Response): Promise<any> => {
					try {
						const token = req.headers.cookie?.split("=")[1];
						const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);
						const idCliente = parseInt(req.query.idCliente as string);

						if (!token) {
							return res.status(401).json({ message: "Token não fornecido" });
						}

						if (!empresaSelecionada || isNaN(empresaSelecionada)) {
							return res.status(400).json({ message: "Informe a empresa selecionada" });
						}

						if (!idCliente || isNaN(idCliente)) {
							return res.status(400).json({ message: "Informe a empresa cliente" });
						}

						const tokenService = new TokenService();
						const isValid = tokenService.validarToken(token, Funcionalidade["Consultar funcionário cliente"], empresaSelecionada);
						if (!isValid) {
							return res.status(401).json({ message: "Token inválido" });
						}
						const clientes = await this.pessoasService.getPessoas(token, empresaSelecionada, false, false, false, true);
						return res.status(200).json(clientes).send();
					} catch (error) {
						return res.status(500).json({ message: "Erro ao buscar funcionários" });
					}
				}
			);

			/**
			 * @swagger
			 * /api/pessoas/cadastrar:
			 *   post:
			 *     summary: Cadastrar uma nova pessoa
			 *     description: Cadastra uma nova pessoa no sistema.
			 *     tags: [Pessoas]
			 *     requestBody:
			 *       required: true
			 *       content:
			 *         application/json:
			 *           schema:
			 *             type: object
			 *             properties:
			 *               ativo:
			 *                 type: boolean
			 *                 example: true
			 *               cargo:
			 *                 type: number
			 *                 example: 1
			 *               cdPessoa:
			 *                 type: number
			 *                 example: 123
			 *               cliente:
			 *                 type: boolean
			 *                 example: true
			 *               cpfCnpj:
			 *                 type: string
			 *                 example: "12345678901"
			 *               dtInicio:
			 *                 type: string
			 *                 format: date
			 *                 example: "2025-05-01"
			 *               dtNasc:
			 *                 type: string
			 *                 format: date
			 *                 example: "1990-01-01"
			 *               email:
			 *                 type: string
			 *                 example: "exemplo@email.com"
			 *               empresa:
			 *                 type: boolean
			 *                 example: false
			 *               empresaUsuario:
			 *                 type: number
			 *                 example: 2
			 *               funcionario:
			 *                 type: boolean
			 *                 example: true
			 *               nome:
			 *                 type: string
			 *                 example: "João da Silva"
			 *               rg:
			 *                 type: string
			 *                 example: "123456789"
			 *     responses:
			 *       201:
			 *         description: Pessoa cadastrada com sucesso.
			 *       400:
			 *         description: Dados inválidos.
			 *       500:
			 *         description: Erro ao cadastrar pessoa.
			 */
			this.router.post(
				"/cadastrar",
				async (req: Request, res: Response): Promise<any> => {
					try {
						const token = req.headers.cookie?.split("=")[1];
						const empresaSelecionada = parseInt(req.query.empresaSelecionada as string);
						const pessoa = req.body as PessoaEntradaDTO;

						if (!token) {
							return res.status(401).json({ message: "Token não fornecido" });
						}

						let tipoPessoaInsercao = [Funcionalidade["Gerenciar pessoa"]];

						if (pessoa.cliente) {
							tipoPessoaInsercao.push(Funcionalidade["Gerenciar cliente"]);
						}
						if (pessoa.funcionario) {
							tipoPessoaInsercao.push(
								Funcionalidade["Gerenciar funcionário cliente"]
							);
						}
						if (pessoa.empresa) {
							tipoPessoaInsercao.push(
								Funcionalidade["Gerenciar empresa consultoria"]
							);
						}

						const tokenService = new TokenService();
						tipoPessoaInsercao.forEach(async (tpInsercao) => {
							const isValid = await tokenService.validarToken(
								token,
								tpInsercao,
								empresaSelecionada
							);

							if (!isValid) {
								return res.status(401).json({ message: "Token inválido" });
							}
						});

						const dadosToken = await tokenService.descripToken(token);

						await this.pessoasService.cadastrarPessoa(
							pessoa,
							dadosToken,
							empresaSelecionada
						);
						return res.status(200).json().send();
					} catch (error) {
						return res
							.status(500)
							.json({ message: "Erro ao cadastrar pessoa" });
					}
				});

			/**
			 * @swagger
			 * /api/pessoas/alterar:
			 *   put:
			 *     summary: Alterar uma pessoa
			 *     description: Altera uma pessoa do sistema.
			 *     tags: [Pessoas]
			 *     requestBody:
			 *       required: true
			 *       content:
			 *         application/json:
			 *           schema:
			 *             type: object
			 *             properties:
			 *               ativo:
			 *                 type: boolean
			 *                 example: true
			 *               cargo:
			 *                 type: number
			 *                 example: 1
			 *               cdPessoa:
			 *                 type: number
			 *                 example: 123
			 *               cliente:
			 *                 type: boolean
			 *                 example: true
			 *               cpfCnpj:
			 *                 type: string
			 *                 example: "12345678901"
			 *               dtInicio:
			 *                 type: string
			 *                 format: date
			 *                 example: "2025-05-01"
			 *               dtNasc:
			 *                 type: string
			 *                 format: date
			 *                 example: "1990-01-01"
			 *               email:
			 *                 type: string
			 *                 example: "exemplo@email.com"
			 *               empresa:
			 *                 type: boolean
			 *                 example: false
			 *               empresaUsuario:
			 *                 type: number
			 *                 example: 2
			 *               funcionario:
			 *                 type: boolean
			 *                 example: true
			 *               nome:
			 *                 type: string
			 *                 example: "João da Silva"
			 *               rg:
			 *                 type: string
			 *                 example: "123456789"
			 *     responses:
			 *       201:
			 *         description: Pessoa alterada com sucesso.
			 *       400:
			 *         description: Dados inválidos.
			 *       500:
			 *         description: Erro ao alterada pessoa.
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

						console.log("token:", token);

						let tipoPessoaInsercao = [Funcionalidade["Gerenciar pessoa"]];

						if (req.body.cliente) {
							tipoPessoaInsercao.push(Funcionalidade["Gerenciar cliente"]);
						}
						if (req.body.funcionario) {
							tipoPessoaInsercao.push(
								Funcionalidade["Gerenciar funcionário cliente"]
							);
						}
						if (req.body.empresa) {
							tipoPessoaInsercao.push(
								Funcionalidade["Gerenciar empresa consultoria"]
							);
						}

						const tokenService = new TokenService();
						tipoPessoaInsercao.forEach(async (tpInsercao) => {
							const isValid = await tokenService.validarToken(
								token,
								tpInsercao,
								empresaSelecionada
							);

							if (!isValid) {
								return res.status(401).json({ message: "Token inválido" });
							}
						});

						const dadosToken = await tokenService.descripToken(token);

						await this.pessoasService.alterarPessoa(
							req.body,
							dadosToken,
							empresaSelecionada
						);
						return res.status(200).json().send();
					} catch (error) {
						return res
							.status(500)
							.json({ message: "Erro ao cadastrar pessoa" });
					}
				}
			);
		} catch (error) {
			throw error;
		}
	}
}
