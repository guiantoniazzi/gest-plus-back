import { Router, Request, Response } from "express";
import { LoginService } from "../service/loginService";
import { Login } from "../model/login";
import { PessoasService } from "../service/pessoasService";

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
       * /pessoas:
       *   get:
       *     summary: Retorna todas as pessoas
       *     description: Retorna uma lista de todas as pessoas cadastradas no sistema.
       *     tags: [Pessoas]
       *     responses:
       *       200:
       *         description: Lista de pessoas.
       */
      this.router.get("/getAll", async (req: Request, res: Response): Promise<any> => {
        try {
          const pessoas = await this.pessoasService.getAll();
          return res.status(200).json(pessoas).send();
        } catch (error) {
          return res.status(500).json({ message: "Erro ao buscar pessoas" });
        }
      });

    }
    catch (error) {
      throw error;
    }
  }
}