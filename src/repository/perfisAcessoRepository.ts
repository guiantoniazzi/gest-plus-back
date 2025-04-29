import { where } from "sequelize";
import PerfisAcesso from "../model/perfisAcesso";

export class PerfisAcessoRepository {
	constructor() {}

	async getPerfisComFuncoes() {
		try {
			const perfisAcesso = await PerfisAcesso.findAll({
				include: [
					{
						association: "funcoes", // Nome da associação definida no modelo
						attributes: ["cdFuncao", "nomeFuncao"], // Campos que deseja retornar
						where: { ativo: 1 }, // Filtrar apenas funções ativas
						required: false, // Permitir perfis sem funções associadas
					},
				],
			});
			return perfisAcesso.map((perfil) => perfil.get({ plain: true })); // Retorna os dados como objetos simples
		} catch (error) {
			console.error("Erro ao buscar perfis de acesso:", error);
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
