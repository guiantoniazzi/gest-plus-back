import FuncoesPerfil from "../model/funcoesPerfil";
import HistFuncoesPerfil from "../model/histFuncoesPerfil";

export class FuncoesPerfilRepository {
	constructor() {}

	async insertFuncoesPerfil(
		cdPerfil: number,
		idsFuncs: number[],
		usuInclusao: string
	) {
		try {
			return idsFuncs.forEach((idFunc) => {
				FuncoesPerfil.create({
					cdPerfil,
					cdFuncao: idFunc,
					usuInclusao,
				});
			});
		} catch (error) {
			console.error("Erro ao buscar funções do sistema:", error);
			throw error;
		}
	}

	async alteraFuncoesPerfil(cdPerfil: number, idsFuncs: number[]) {
		try {
			const funcsDoPerfil = (await FuncoesPerfil.findAll({
				attributes: ["cdFuncao"],
				where: { cdPerfil: cdPerfil },
				raw: true,
			})) as any[];

			const idsFuncsExistentes = funcsDoPerfil.map((func) => func.cdFuncao);
			const funcsParaRemover = idsFuncsExistentes.filter(
				(cdFuncao) => !idsFuncs.includes(cdFuncao)
			);
			const funcsParaAdicionar = idsFuncs.filter(
				(cdFuncao) => !idsFuncsExistentes.includes(cdFuncao)
			);

			await this.salvarHistoricoFuncoesPerfil(cdPerfil, funcsParaRemover);

			if (funcsParaRemover.length > 0) {
				await FuncoesPerfil.destroy({
					where: {
						cdPerfil: cdPerfil,
						cdFuncao: funcsParaRemover,
					},
				});
			}

			if (funcsParaAdicionar.length > 0) {
				const novasFuncoes = funcsParaAdicionar.map((cdFuncao) => ({
					cdPerfil,
					cdFuncao,
					dtHrAlteracao: new Date(),
				}));

				await FuncoesPerfil.bulkCreate(novasFuncoes);
			}
		} catch (error) {
			console.error("Erro ao alterar funções do perfil:", error);
			throw error;
		}
	}

	async salvarHistoricoFuncoesPerfil(
		cdPerfil: number,
		funcoesExcluidas: number[]
	) {
		try {
			const historico = [
				...funcoesExcluidas.map((cdFuncao) => ({
					cdPerfil,
					cdFuncao,
					dtHrAlteracao: new Date(),
				})),
			];
			await HistFuncoesPerfil.bulkCreate(historico);
		} catch (error) {
			console.error("Erro ao salvar histórico de funções do perfil:", error);
			throw error;
		}
	}
}
