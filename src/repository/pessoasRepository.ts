import ClienteEmpresa from "../model/clienteEmpresa";
import FuncionarioCliente from "../model/funcionarioCliente";
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

	async getById(id: number) {
		try {
			const pessoa = await Pessoas.findByPk(id);
			if (!pessoa) {
				throw new Error("Pessoa não encontrada");
			}
			return pessoa;
		} catch (error) {
			console.error("Erro ao buscar pessoa:", error);
			throw error;
		}
	}

	async getFuncionarioById(cdPessoa: number, cdCliente: number) {
		try {	
			const funcionario = await FuncionarioCliente.findOne({
				where: { cdFuncionario: cdPessoa, cdCliente: cdCliente },
			});
			if (!funcionario) {
				return null;
			}
			return funcionario;
		} catch (error) {
			console.error("Erro ao buscar funcionário:", error);
		}
	}

	async getClienteById(cdPessoa: number, cdEmpresa: number) {
		try {
			const cliente = await ClienteEmpresa.findOne({
				where: { cdCliente: cdPessoa, cdEmpresa: cdEmpresa },
			});
			if (!cliente) {
				return null;
			}
			return cliente;
		} catch (error) {
			console.error("Erro ao buscar cliente:", error);
			throw error;
		}
	}

	async cadastrarPessoa(pessoa: any) {
		try {
			const result = await Pessoas.create(pessoa);
			return result;
		} catch (error) {
			console.error("Erro ao cadastrar pessoa:", error);
			throw error;
		}
	}

	async cadastrarFuncionarioCliente(funcionarioCliente: any) {
		try {
			const result = await FuncionarioCliente.create(funcionarioCliente);
			return result;
		} catch (error) {
			console.error("Erro ao cadastrar funcionário:", error);
			throw error;
		}
	}

	async cadastrarClienteEmpresa(clienteEmpresa: any) {
		try {
			const result = await ClienteEmpresa.create(clienteEmpresa);
			return result;
		} catch (error) {
			console.error("Erro ao cadastrar cliente:", error);
			throw error;
		}
	}

	async alterarPessoa(pessoa: any) {
		try {
			const result = await Pessoas.update(pessoa, {
				where: { cdPessoa: pessoa.cdPessoa },
			});
			return result;
		} catch (error) {
			console.error("Erro ao alterar pessoa:", error);
			throw error;
		}
	}

	async alterarFuncionarioCliente(funcionarioCliente: any) {
		try {
			const result = await FuncionarioCliente.update(funcionarioCliente, {
				where: {
					cdFuncionario: funcionarioCliente.cdFuncionario,
					cdCliente: funcionarioCliente.cdCliente,
				},
			});
			return result;
		} catch (error) {
			console.error("Erro ao alterar funcionário:", error);
			throw error;
		}
	}

	async alterarClienteEmpresa(clienteEmpresa: any) {
		try {
			const result = await ClienteEmpresa.update(clienteEmpresa, {
				where: {
					cdCliente: clienteEmpresa.cdCliente,
					cdEmpresa: clienteEmpresa.cdEmpresa,
				},
			});
			return result;
		} catch (error) {
			console.error("Erro ao alterar cliente:", error);
			throw error;
		}
	}
}
