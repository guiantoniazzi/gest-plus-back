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

    async cadastrarUsuario(usuario: any) {
        try {
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

    async cadastrarUsuarioEmpresa(usuario: any) {
        try {
            return await this.usuarioRepository.cadastrarUsuarioEmpresa(usuario);
        } catch (error) {
            throw error;
        }
    }
}
