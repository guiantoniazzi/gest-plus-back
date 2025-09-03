import ClienteEmpresa from "../model/clienteEmpresa";
import FuncionarioCliente from "../model/funcionarioCliente";
import Pessoa from "../model/pessoa";
import PessoaAux from "../model/pessoaAux";

export class PessoasRepository {
	constructor() {}

	async getPessoas(empresaSelecionada: number) {
		try {
			const pessoas = await Pessoa.findAll({
				include: [{
					model: PessoaAux,
					as: "pessoaAux",
					where: {
						cdEmpresa: empresaSelecionada,
						cliente: 0,
						empresa: 0,
					},
				},
				{
                    model: FuncionarioCliente,
                    as: "funcionarioCliente",
                    required: false, // <-- sempre traz, mesmo se não for funcionário
                    where: {
                        cdEmpresa: empresaSelecionada,
                        ativo: 1
                    }
                }] 
			});

			const pessoasNaoFuncionarios = [];
			for (const pessoa of pessoas) {
				const funcionario = await FuncionarioCliente.findOne({
					where: { 
						cdFuncionario: pessoa.dataValues.cdPessoa, 
						cdEmpresa: empresaSelecionada,
						ativo: 1
					},
				});
				if (!funcionario) {
					pessoasNaoFuncionarios.push(pessoa);
				}
			}
			
			return pessoasNaoFuncionarios;
		} catch (error) {
			console.error("Erro ao buscar pessoas:", error);
			throw error;
		}
	}

	async getEmpresas(empresaSelecionada: number) {
		try {
			const empresas = await Pessoa.findAll({
				include: [{
					model: PessoaAux,
					as: "pessoaAux",
					where: {
						cdEmpresa: empresaSelecionada,
						cliente: 0,
						empresa: 1,
					},
				},
				{
                    model: FuncionarioCliente,
                    as: "funcionarioCliente",
                    required: false, // <-- sempre traz, mesmo se não for funcionário
                    where: {
                        cdEmpresa: empresaSelecionada,
                        ativo: 1
                    }
                }] 
			});

			return empresas;
		} catch (error) {
			console.error("Erro ao buscar empresas:", error);
			throw error;
		}
	}

	async getClientes(empresaSelecionada: number) {
		try {
			const clientes = await Pessoa.findAll({
				include: [{
					model: PessoaAux,
					as: "pessoaAux",
					where: {
						cdEmpresa: empresaSelecionada,
						cliente: 1,
						empresa: 0,
					},
				},
				{
                    model: FuncionarioCliente,
                    as: "funcionarioCliente",
                    required: false, // <-- sempre traz, mesmo se não for funcionário
                    where: {
                        cdEmpresa: empresaSelecionada,
                        ativo: 1
                    }
                }] 
			});

			return clientes;
		} catch (error) {
			console.error("Erro ao buscar clientes:", error);
			throw error;
		}
	}

	async getFuncionarios(empresaSelecionada: number) {
		try {
			const pessoas = await Pessoa.findAll({
				include: [
					{
						model: PessoaAux,
						as: "pessoaAux",
						where: {
							cdEmpresa: empresaSelecionada,
							cliente: 0,
							empresa: 0,
						},
					},
					{
						model: FuncionarioCliente,
						as: "funcionarioCliente",
						where: {
							cdEmpresa: empresaSelecionada,
							ativo: 1
						}
                	}
				] 
			});

			const pessoasFuncionarios = [];
			for (const pessoa of pessoas) {
				const funcionario = await FuncionarioCliente.findOne({
					where: { 
						cdFuncionario: pessoa.dataValues.cdPessoa, 
						cdEmpresa: empresaSelecionada,
						ativo: 1
					},
				});
				if (funcionario) {
					pessoasFuncionarios.push(pessoa);
				}
			}
			
			return pessoasFuncionarios;
		} catch (error) {
			console.error("Erro ao buscar funcionarios:", error);
			throw error;
		}
	}
	async getById(id: number) {
		try {
			const pessoa = await Pessoa.findByPk(id);
			if (!pessoa) {
				throw new Error("Pessoa não encontrada");
			}
			return pessoa;
		} catch (error) {
			console.error("Erro ao buscar pessoa:", error);
			throw error;
		}
	}

	async getByDoc(doc: string) {
		try {
			const pessoa = await Pessoa.findOne({
				where: { cpfCnpj: doc }
			});
			
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
			const result = await Pessoa.create(pessoa);
			return result;
		} catch (error) {
			console.error("Erro ao cadastrar pessoa:", error);
			throw error;
		}
	}

	async cadastrarPessoaAux(pessoa: any) {
		try {
			const result = await PessoaAux.create(pessoa);
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
			const result = await Pessoa.update(pessoa, {
				where: { cdPessoa: pessoa.cdPessoa },
			});
			return result;
		} catch (error) {
			console.error("Erro ao alterar pessoa:", error);
			throw error;
		}
	}

	async alterarPessoaAux(pessoa: any) {
		try {
			const result = await PessoaAux.update(pessoa, {
				where: { cdPessoa: pessoa.cdPessoa, cdEmpresa: pessoa.cdEmpresa },
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
