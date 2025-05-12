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
}
