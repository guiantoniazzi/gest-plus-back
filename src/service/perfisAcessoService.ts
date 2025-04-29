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
		perfil: { cdPerfil: number; nomePerfil: string; ativo: boolean; idsFuncoesSistema: number[] },
		usuAlteracao: string
	) {
		const cdPerfil = perfil.cdPerfil;
		const nome = perfil.nomePerfil;
		const ativo = perfil.ativo;
		try {
			const novoPerfil = await this.perfisAcessoRepository.alterarPerfil(
				{
					cdPerfil,
					nomePerfil: nome,
					ativo,
				},
				usuAlteracao
			);
			const funcoes = await this.funcoesPerfilRepository.getFuncoesPerfil(cdPerfil);
			if(perfil.idsFuncoesSistema.some(funcao => !funcoes.some(f => f.cdFuncao === funcao))) {
				await this.funcoesPerfilRepository.insertFuncoesPerfil(cdPerfil, perfil.idsFuncoesSistema.filter(funcao => !funcoes.some(f => f.cdFuncao === funcao)), usuAlteracao);
			}
			if(funcoes.some(funcao => !perfil.idsFuncoesSistema.some(f => f === funcao.cdFuncao))) {
				await this.funcoesPerfilRepository.deleteFuncoesPerfil(cdPerfil, funcoes.filter(funcao => !perfil.idsFuncoesSistema.some(f => f === funcao.cdFuncao)).map(funcao => funcao.cdFuncao), usuAlteracao);
			}
			return novoPerfil;
		} catch (error) {
			throw error;
		}
	}
}
