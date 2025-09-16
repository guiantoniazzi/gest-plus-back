import { AtividadeRepository } from "../repository/atividadeRepository";

export class AtividadeService {
    private atividadeRepository: AtividadeRepository;

    constructor() {
        this.atividadeRepository = new AtividadeRepository();
    }

    async getByIdProj(idProj: number, cdEmpresa: number) {
        try {
            return await this.atividadeRepository.getByIdProj(idProj, cdEmpresa);
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

    async alocar(alocacao: any, dadosToken: any) {
        try {
            var alocacaoAnterior = await this.atividadeRepository.getByCdAtivCdPessoa(alocacao.cdAtiv, alocacao.cdPessoa);

            alocacao.usuAlteracao = dadosToken.cdUsuario;
            alocacao.dtHrAlteracao = Date.now();

            if (alocacaoAnterior) {
                return await this.atividadeRepository.alterarAlocacao(alocacao);
            }

            alocacao.usuInclusao = dadosToken.cdUsuario;
            alocacao.dtHrInclusao = Date.now();
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

    async cadastrar(atividade: any, dadosToken: any) {
        try {
            atividade.usuInclusao = dadosToken.cdUsuario;
            atividade.usuAlteracao = dadosToken.cdUsuario;
            atividade.dtHrInclusao = Date.now();
            atividade.dtHrAlteracao = Date.now();
            return await this.atividadeRepository.cadastrar(atividade);
        } catch (error) {
            throw error;
        }
    }
}

export default AtividadeService;