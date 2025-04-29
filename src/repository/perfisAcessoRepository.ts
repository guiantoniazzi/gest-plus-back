import PerfisAcesso from "../model/perfisAcesso";
import HistPerfisAcesso from "../model/histPerfilAcesso";

export class PerfisAcessoRepository {
	constructor() {}

	async getPerfilById(cdPerfil: number) {
		try {
			const perfil = await PerfisAcesso.findOne({
				where: { cdPerfil },
				raw: true,
			});
			return perfil;
		} catch (error) {
			console.error("Erro ao buscar perfil por ID:", error);
			throw error;
		}
	}

	async getPerfisComFuncoes() {
		try {
			const perfisAcesso = await PerfisAcesso.findAll({
				include: [
					{
						association: "funcoes",
						attributes: ["cdFuncao", "nomeFuncao"],
						where: { ativo: 1 },
						required: false,
					},
				],
			});
			return perfisAcesso.map((perfil) => perfil.get({ plain: true }));
		} catch (error) {
			console.error("Erro ao buscar perfis de acesso:", error);
			throw error;
		}
	}

	async salvarHistoricoPerfil(perfil: {
		cdPerfil: number;
		nomePerfil: string;
		ativo: boolean;
		dtHrAlteracao: Date;
	}) {
		try {
			await HistPerfisAcesso.create({
				cdPerfil: perfil.cdPerfil,
				dtHrAlteracao: new Date(),
				nomePerfil: perfil.nomePerfil,
				ativo: perfil.ativo,
			});
		} catch (error) {
			console.error("Erro ao salvar histórico do perfil de acesso:", error);
			throw error;
		}
	}

	async cadastrarPerfil(
		perfil: { nomePerfil: string; ativo: boolean },
		usuInclusao: string
	) {
		try {
			const novoPerfil = await PerfisAcesso.create({
				nomePerfil: perfil.nomePerfil,
				ativo: perfil.ativo,
				usuInclusao,
			});
			return novoPerfil;
		} catch (error) {
			console.error("Erro ao cadastrar perfil de acesso:", error);
			throw error;
		}
	}
	async alterarPerfil(
		perfil: { idPerfil: number; nomePerfil: string; ativo: boolean },
		usuAlteracao: string
	) {
		try {
			const perfilAterado = await PerfisAcesso.update(
				{
					nomePerfil: perfil.nomePerfil,
					ativo: perfil.ativo,
					usuAlteracao: usuAlteracao,
					dtHrAlteracao: Date.now(),
				},
				{ where: { cdPerfil: perfil.idPerfil } }
			);
			return perfilAterado;
		} catch (error) {
			console.error("Erro ao cadastrar perfil de acesso:", error);
			throw error;
		}
	}
}
