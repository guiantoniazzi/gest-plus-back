import Pessoas from "../model/pessoas";

export class PessoasRepository {
	constructor() {}

	async getAll() {
		try {
			const pessoas = await Pessoas.findAll({ raw: true });
			return pessoas;
		} catch (error) {
			console.error("Erro ao buscar pessoas:", error);
			throw error;
		}
	}
}
