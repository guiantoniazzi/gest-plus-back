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
            // Buscar as funções já associadas ao perfil
            const funcsDoPerfil = await FuncoesPerfil.findAll({
                attributes: ["cdFuncao"],
                where: { cdPerfil: cdPerfil },
                raw: true, // Retorna objetos simples
            }) as any[];
    
            // Extrair os IDs das funções já associadas
            const idsFuncsExistentes = funcsDoPerfil.map((func) => func.cdFuncao);
    
            // Identificar funções que precisam ser removidas
            const funcsParaRemover = idsFuncsExistentes.filter(
                (cdFuncao) => !idsFuncs.includes(cdFuncao)
            );
    
            // Identificar funções que precisam ser adicionadas
            const funcsParaAdicionar = idsFuncs.filter(
                (cdFuncao) => !idsFuncsExistentes.includes(cdFuncao)
            );
    
            await this.salvarHistoricoFuncoesPerfil(
                cdPerfil,
                funcsParaRemover
            );
    
            // Remover as funções que não estão mais associadas ao perfil
            if (funcsParaRemover.length > 0) {
                await FuncoesPerfil.destroy({
                    where: {
                        cdPerfil: cdPerfil,
                        cdFuncao: funcsParaRemover,
                    },
                });
                console.log(`Funções removidas: ${funcsParaRemover}`);
            }
    
            // Adicionar as novas funções ao perfil
            if (funcsParaAdicionar.length > 0) {
                const novasFuncoes = funcsParaAdicionar.map((cdFuncao) => ({
                    cdPerfil,
                    cdFuncao,
                    dtHrAlteracao: new Date(),
                }));
    
                await FuncoesPerfil.bulkCreate(novasFuncoes);
                console.log(`Funções adicionadas: ${funcsParaAdicionar}`);
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
					dtHrAlteracao: new Date(), // Data e hora da exclusão
				})),
			];

			await HistFuncoesPerfil.bulkCreate(historico);
		} catch (error) {
			console.error("Erro ao salvar histórico de funções do perfil:", error);
			throw error;
		}
	}
}
