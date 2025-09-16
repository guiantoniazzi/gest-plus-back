import Pessoa from "../model/pessoa";
import Usuario from "../model/usuario";
import UsuarioEmpresa from "../model/usuarioEmpresa";
import { conSequelize } from "./connection";

export class UsuarioRepository {
  constructor() {}

  async cadastrarUsuarioEmpresa(usuario: any) {
    try {
      const novoUsuario = await UsuarioEmpresa.create(usuario);
      return novoUsuario;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const usuarios = await Usuario.findAll({
        attributes: {
          include: [
            [
              conSequelize.fn("COUNT", conSequelize.col("empresas.CD_PESSOA")),
              "qtdEmpresas",
            ],
          ],
        },
        include: [
          {
            model: Pessoa,
            as: "empresas",
            attributes: [],
            through: { attributes: [] },
          },
        ],
        group: ["Usuario.CD_USUARIO"],
      });

      return usuarios;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  }

  async getById(cdUsuario: string) {
    try {
      const usuario = await Usuario.findOne({
        where: { cdUsuario },
      });
      return usuario;
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      throw error;
    }
  }

  async cadastrarUsuario(usuario: any) {
    try {
      const novoUsuario = await Usuario.create(usuario);
      return novoUsuario;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  }

  async alterarUsuario(usuario: any) {
    try {
      const usuarioAlterado = await Usuario.update(usuario, {
        where: { cdUsuario: usuario.cdUsuario },
      });
      return usuarioAlterado;
    } catch (error) {
      console.error("Erro ao alterar usuário:", error);
      throw error;
    }
  }
}
