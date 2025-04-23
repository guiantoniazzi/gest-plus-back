import { FuncoesSistemaRepository } from "../repository/funcoesSistemaRepository";

export class FuncoesSistemaService {
    private funcoesSistemaRepository: FuncoesSistemaRepository;

    constructor() {
        this.funcoesSistemaRepository = new FuncoesSistemaRepository();
    }

    async buscarFuncoesPorIds(ids: number[]): Promise<number[]> {
        try {
            const funcoes = await this.funcoesSistemaRepository.buscarFuncoesPorIds(ids);
            return funcoes.map((funcao) => funcao.cdFuncao);
        } catch (error) {
            console.error("Erro ao buscar funções do sistema:", error);
            throw error;
        }
    }
}