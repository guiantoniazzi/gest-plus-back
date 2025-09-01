import ProjetoDTO from "../dto/projetoDTO";
import { ProjetoRepository } from "../repository/projetoRepository";
import { PermissoesLoginOut } from "../dto/permissoesLoginOut";

export class ProjetoService {
    private projetoRepository: ProjetoRepository;

    constructor() {
        this.projetoRepository = new ProjetoRepository();
    }

    async getAll(empresaSelecionada: number) {
        try {
            const result = await this.projetoRepository.getAll(empresaSelecionada);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async cadastrarProjeto(
        projetoDTO: ProjetoDTO,
        dadosToken: PermissoesLoginOut,
        empresaSelecionada: number
    ) {
        const projeto = {
            ...projetoDTO,
            cdEmpresa: empresaSelecionada,
            usuInclusao: dadosToken.cdUsuario,
            dtHrInclusao: new Date(),
			usuAlteracao: dadosToken.cdUsuario,
            dtHrAlteracao: new Date(),
        };
        try {
            const result = await this.projetoRepository.cadastrarProjeto(projeto);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async alterarProjeto(
        projetoDTO: ProjetoDTO,
        dadosToken: PermissoesLoginOut,
        empresaSelecionada: number
    ) {
        const projeto = {
            ...projetoDTO,
            cdEmpresa: empresaSelecionada,
            usuAlteracao: dadosToken.cdUsuario,
            dtHrAlteracao: new Date(),
        };
        try {
            const result = await this.projetoRepository.alterarProjeto(projeto);
            return result;
        } catch (error) {
            throw error;
        }
    }
}