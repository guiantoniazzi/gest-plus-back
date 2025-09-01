import SituacaoProj from "../model/situacaoProj";

export class SituacaoProjRepository {
    constructor() {}

    async getAll() {
        try {
            const situacoes = await SituacaoProj.findAll();
            return situacoes;
        } catch (error) {
            console.error("Erro ao buscar situações de projeto:", error);
            throw error;
        }
    }
}