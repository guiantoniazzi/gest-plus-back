import FuncoesSistema from "../model/funcoesSistema";

export class FuncoesSistemaRepository {
    constructor() {}

    async buscarFuncoesPorIds(ids: number[]): Promise<any[]> {
        try {
            const funcoes = await FuncoesSistema.findAll({
                where: {
                    cdFuncao: ids, // Filtrar pelas IDs fornecidas
                    ativo: 1, // Apenas funções ativas
                },
                attributes: ["cdFuncao"], // Selecionar apenas os atributos necessários
                raw: true, // Retornar os dados como objetos simples
            });
            return funcoes;
        } catch (error) {
            console.error("Erro ao buscar funções do sistema:", error);
            throw error;
        }
    }
}