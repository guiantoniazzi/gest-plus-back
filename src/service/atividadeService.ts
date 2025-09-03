import { AtividadeRepository } from "../repository/atividadeRepository";

export class AtividadeService {
    private atividadeRepository: AtividadeRepository;

    constructor() {
        this.atividadeRepository = new AtividadeRepository();
    }

    async getByIdProj(idProj: number) {
        try {
            return await this.atividadeRepository.getByIdProj(idProj);
        } catch (error) {
            throw error;
        }
    }

    async getById(cdAtiv: number) {
        try {
            return await this.atividadeRepository.getById(cdAtiv);
        } catch (error) {
            throw error;
        }
    }

    async alterar(atividade: any) {
        try {
            return await this.atividadeRepository.alterar(atividade);
        } catch (error) {
            throw error;
        }
    }

    async alocar(alocacao: any) {
        try {
            return await this.atividadeRepository.alocar(alocacao);
        } catch (error) {
            throw error;
        }
    }

    async desalocar(cdPessoa: number, cdAtiv: number) {
        try {
            return await this.atividadeRepository.desalocar(cdPessoa, cdAtiv);
        } catch (error) {
            throw error;
        }
    }

    async alterarAlocacao(alocacao: any) {
        try {
            return await this.atividadeRepository.alterarAlocacao(alocacao);
        } catch (error) {
            throw error;
        }
    }

    async cadastrar(atividade: any) {
        try {
            return await this.atividadeRepository.cadastrar(atividade);
        } catch (error) {
            throw error;
        }
    }
}

export default AtividadeService;