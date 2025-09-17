import { col, Op, where } from "sequelize";
import PerfisAcesso from "../model/perfisAcesso";
import Pessoa from "../model/pessoa";
import PessoaAux from "../model/pessoaAux";
import Usuario from "../model/usuario";
import UsuarioEmpresa from "../model/usuarioEmpresa";
import { conSequelize } from "./connection";

export class UsuarioRepository {
  constructor() {}

  async associarUsuario(usuario: any) {
    try {
      const novoUsuario = await UsuarioEmpresa.create(usuario);
      return novoUsuario;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  }

  async getAssociacao(cdUsuario: number, cdEmpresa: number) {
    try {
      return UsuarioEmpresa.findOne({ where: { cdUsuario, cdEmpresa } });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const usuarios = await Usuario.findAll({
        include: [
          {
            model: Pessoa,
            as: "empresas",
          },
        ],
      });

      return usuarios;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  }

  async getAssociacoes(cdUsuario: number) {
    try {
      const usuarios = await UsuarioEmpresa.findAll({
        where: { cdUsuario },
        include: [
          {
            model: Usuario,
            as: "usuario",
            include: [
              {
                model: Pessoa,
                as: "pessoa", // pessoa física/jurídica do usuário
              },
            ],
          },
          {
            model: Pessoa,
            as: "empresa", // empresa vinculada
            include: [
              {
                model: PessoaAux,
                as: "pessoaAux",
                required: false,
              },
            ],
          },
          {
            model: PerfisAcesso,
            as: "perfil",
          },
        ],
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

  async getBycdPessoa(cdPessoa: number) {
    try {
      return await Usuario.findOne({ where: { cdPessoa: cdPessoa } });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    }
  }
}
