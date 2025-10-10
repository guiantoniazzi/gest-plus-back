import { UsuarioRepository } from "../repository/usuarioRepository";

export class UsuarioService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async getAll() {
        try {
            return await this.usuarioRepository.getAll();
        } catch (error) {
            throw error;
        }
    }

    async getById(cdUsuario: string) {
        try {
            return await this.usuarioRepository.getById(cdUsuario);
        } catch (error) {
            throw error;
        }
    }

    async associarUsuario(associacao: any) {
        try {
            const assoc = await this.usuarioRepository.getAssociacao(associacao.cdUsuario, associacao.cdEmpresa);
            if (assoc?.dataValues) {
                throw ("Essa associação já existe")
            }
            return await this.usuarioRepository.associarUsuario(associacao);
        } catch (error) {
            throw error;
        }
    }

    async cadastrarUsuario(usuario: any) {
        try {
            const usuarioCadastrado = await this.usuarioRepository.getBycdPessoa(usuario.cdPessoa)
            if (usuarioCadastrado?.dataValues) {
                throw ("Documento já cadastrado")
            }
            return await this.usuarioRepository.cadastrarUsuario(usuario);
        } catch (error) {
            throw error;
        }
    }

    async alterarUsuario(usuario: any) {
        try {
            return await this.usuarioRepository.alterarUsuario(usuario);
        } catch (error) {
            throw error;
        }
    }

    async alterarEmpresasUsuario(usuario: any, idsEmpresas: number[]) {
        try {
            // const usuEmpresa = await this.usuarioRepository.getUsuEmpresa(usuario.cdUsuario);
        } catch (error) {
            throw error;
        }
    }

    async getAssociacoes(cdUsuario: any) {
        try {
            return await this.usuarioRepository.getAssociacoes(cdUsuario);
        } catch (error) {
            throw error;
        }
    }

    async alterarAssociacao(associacao: any) {
       try {
            return await this.usuarioRepository.alterarAssociacao(associacao);
        } catch (error) {
            throw error;
        }
    }

}
