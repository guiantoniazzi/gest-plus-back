import { FuncoesPerfilRepository } from "../repository/funcoesPerfilRepository";
import { PerfisAcessoRepository } from "../repository/perfisAcessoRepository";

export class PerfisAcessoService {
	private perfisAcessoRepository: PerfisAcessoRepository;
	private funcoesPerfilRepository: FuncoesPerfilRepository;

	constructor() {
		this.perfisAcessoRepository = new PerfisAcessoRepository();
		this.funcoesPerfilRepository = new FuncoesPerfilRepository();
	}

	async getPerfisComFuncoes() {
		try {
			const result = await this.perfisAcessoRepository.getPerfisComFuncoes();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async cadastrarPerfil(
		perfil: { nomePerfil: string; ativo: boolean; idsFuncoesSistema: number[] },
		usuInclusao: string
	) {
		const nome = perfil.nomePerfil;
		const ativo = perfil.ativo;
		const idsFuncs = perfil.idsFuncoesSistema;
		try {
			const novoPerfil = await this.perfisAcessoRepository.cadastrarPerfil(
				{
					nomePerfil: nome,
					ativo,
				},
				usuInclusao
			);
			if (idsFuncs && idsFuncs.length > 0) {
				await this.funcoesPerfilRepository.insertFuncoesPerfil(
					novoPerfil.dataValues.cdPerfil,
					idsFuncs,
					usuInclusao
				);
			}
			return novoPerfil;
		} catch (error) {
			throw error;
		}
	}

	async alterarPerfil(
		perfil: {
			idPerfil: number;
			nomePerfil: string;
			ativo: boolean;
			idsFuncoesSistema: number[];
		},
		usuAlteracao: string
	) {
		const idPerfil = perfil.idPerfil;
		const nome = perfil.nomePerfil;
		const ativo = perfil.ativo;
		const idsFuncs = perfil.idsFuncoesSistema;

		try {
			// Buscar o perfil atual para salvar no histórico
			const perfilAtual = (await this.perfisAcessoRepository.getPerfilById(
				idPerfil
			)) as unknown as { nomePerfil: string; ativo: boolean } | null;

			if (!perfilAtual) {
				throw new Error("Perfil não encontrado.");
			}

			// Salvar o histórico do perfil
			await this.perfisAcessoRepository.salvarHistoricoPerfil({
				cdPerfil: idPerfil,
				nomePerfil: perfilAtual.nomePerfil,
				ativo: perfilAtual.ativo,
				dtHrAlteracao: new Date(),
			});

			// Alterar o perfil
			const perfilAlterado = await this.perfisAcessoRepository.alterarPerfil(
				{
					idPerfil,
					nomePerfil: nome,
					ativo,
				},
				usuAlteracao
			);

			// Alterar as funções associadas ao perfil
			await this.funcoesPerfilRepository.alteraFuncoesPerfil(
				idPerfil,
				idsFuncs
			);

			return perfilAlterado;
		} catch (error) {
			console.error("Erro ao alterar perfil de acesso:", error);
			throw error;
		}
	}
}
