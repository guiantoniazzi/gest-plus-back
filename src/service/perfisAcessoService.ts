import { PerfisAcessoRepository } from "../repository/perfisAcessoRepository";

export class PerfisAcessoService {
    private perfisAcessoRepository: PerfisAcessoRepository;

    constructor() {
        this.perfisAcessoRepository = new PerfisAcessoRepository();
    }

    async getPerfisComFuncoes() {
        try {
            const result = await this.perfisAcessoRepository.getPerfisComFuncoes();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async cadastrarPerfil(perfil: { nomePerfil: string; ativo: boolean }) {
        try {
            const novoPerfil = await this.perfisAcessoRepository.cadastrarPerfil(perfil);
            return novoPerfil;
        } catch (error) {
            throw error;
        }
    }
}