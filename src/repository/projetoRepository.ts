import ClienteEmpresa from "../model/clienteEmpresa";
import FuncionarioCliente from "../model/funcionarioCliente";
import Pessoa from "../model/pessoa";
import PessoaAux from "../model/pessoaAux";
import Projeto from "../model/projeto";
import SituacaoProj from "../model/situacaoProj";

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

	async cadastrarProjeto(projeto: any) {
		try {
			const result = await Projeto.create(projeto);
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
			return result;
		} catch (error) {
			console.error("Erro ao alterar projeto:", error);
			throw error;
		}
	}
}
