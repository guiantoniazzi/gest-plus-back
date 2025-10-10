import SituacaoProj from "../model/situacaoProj";

export class SituacaoProjRepository {
    constructor() {}

    async getAll(atividade: boolean = false) {
        try {
            const situacoes = await SituacaoProj.findAll({where: { atividade }});
            return situacoes;
        } catch (error) {
            console.error("Erro ao buscar situações de projeto:", error);
            throw error;
        }
    }
}