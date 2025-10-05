import HistoricoProjeto from "../model/historico/historicoProjeto";
import Projeto from "../model/projeto";
import SituacaoProj from "../model/situacaoProj";
import { con } from "./connection";

export class ProjetoRepository {
	constructor() {}

	async getAll(empresaSelecionada: number) {
		try {
			const pessoas = await Projeto.findAll({
				where: { cdEmpresa: empresaSelecionada },
				include: [
                    {
                        model: SituacaoProj,
                        as: "situacaoProj",
                        attributes: ["descSituacao", "cor"],
                    },
                ]
			});
			return pessoas;
		} catch (error) {
			console.error("Erro ao buscar pessoas:", error);
			throw error;
		}
	}

	async getHistorico(cdProj: number) {
		try {
			const pessoas = await HistoricoProjeto.findAll({
				where: { cdProj: cdProj },
				include: [
                    {
                        model: SituacaoProj,
                        as: "situacaoProj",
                        attributes: ["descSituacao", "cor"],
                    },
                ]
			});
			return pessoas;
		} catch (error) {
			console.error("Erro ao buscar histórico do projeto:", error);
			throw error;
		}
	}

	async cadastrarProjeto(projeto: any) {
		try {
			const result = await Projeto.create(projeto);
			if (result.dataValues) {
				projeto.cdProj = result.dataValues.cdProj;
				this.insertHistorico(projeto);
			}
			return result;
		} catch (error) {
			console.error("Erro ao cadastrar projeto:", error);
			throw error;
		}
	}

	async alterarProjeto(projeto: any) {
		try {
			const result = await Projeto.update(projeto, {
				where: { cdProj: projeto.cdProj },
			});
			if (result[0] === 1) {
				projeto = await Projeto.findOne({ where: { cdProj: projeto.cdProj } });
				this.insertHistorico(projeto.dataValues);
			}
			return result;
		} catch (error) {
			console.error("Erro ao alterar projeto:", error);
			throw error;
		}
	}

	async insertHistorico(projeto: any) {
		try {
			const result = await HistoricoProjeto.create(projeto);
			return result;
		} catch (error) {
			console.error("Erro ao inserir histórico do projeto:", error);
			throw error;
		}
	}
}
