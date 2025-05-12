import { Router, Request, Response } from "express";
import { LoginService } from "../service/loginService";
import { Login } from "../dto/login";
import { TokenService } from "../service/tokenService";

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Endpoint de autenticação do sistema
*/

export default class LoginController {
  public router = Router();
  private loginService: LoginService;
  private tokenService: TokenService;

  constructor() {
    this.loginService = new LoginService();
    this.tokenService = new TokenService();
  }


  /**
   * @swagger
   * /api/login/autenticar:
   *   post:
   *     summary: Login do Usuário
   *     description: Autentica usuário retornando token
   *     tags: [Login]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               usuario:
   *                 type: string
   *                 example: gui
   *               senha:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       200:
   *         description: Token de autenticação.
   */

  inicializarRotas() {
    try {
      this.router.post("/autenticar", async (req: Request, res: Response): Promise<any> => {
        const { usuario, senha } = req.body;

        if (!usuario) {
          return res.status(400).json({ message: "Informe o usuário" });
        }

        var login = new Login()
        login.usuario = usuario;
        login.senha = senha;

        var permissoesLogin = await this.loginService.validarCredenciais(login);


        return res.status(200).cookie("token", this.tokenService.gerarToken(permissoesLogin), {
          httpOnly: true,
          // secure: true,
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24
        }).json(permissoesLogin).send();
      });
    }
    catch (error) {
      throw error;
    }
  }
}