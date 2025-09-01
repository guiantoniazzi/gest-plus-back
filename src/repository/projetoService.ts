import { PermissoesLogin } from "../dto/permissoesLogin";
import { PermissoesLoginOut } from "../dto/permissoesLoginOut";
import PessoaEntradaDTO from "../dto/pessoaEntradaDTO";
import { con } from "../repository/connection";
import { PessoasRepository } from "../repository/pessoasRepository";

export class ProjetoService {
	private pessoasRepository: PessoasRepository;

	constructor() {
		this.pessoasRepository = new PessoasRepository();
	}

	async getAll(empresaSelecionada: number) {
		try {
			// const result = await this.pessoasRepository.getAll(empresaSelecionada);
			// return result;
		} catch (error) {
			throw error;
		}
	}

	async cadastrarPessoa(
		pessoaEntradaDTO: PessoaEntradaDTO,
		dadosToken: PermissoesLoginOut,
		empresaSelecionada: number
	) {
		var pessoaCadastrada = await this.pessoasRepository.getByDoc(pessoaEntradaDTO.cpfCnpj);

		if (!pessoaCadastrada) {
			const pessoa = {
				tpPessoa: pessoaEntradaDTO.cpfCnpj.length > 11 ? "J" : "F", // Define se é pessoa física (F) ou jurídica (J)
				cpfCnpj: pessoaEntradaDTO.cpfCnpj,
				usuInclusao: dadosToken.cdUsuario,
				dtHrInclusao: new Date(),
				usuAlteracao: dadosToken.cdUsuario,
				dtHrAlteracao: new Date(),
			};
			console.log("DAdos Token:", dadosToken);
			console.log("Cadastrando pessoa:", pessoa);
			pessoaCadastrada = await this.pessoasRepository.cadastrarPessoa(
				pessoa
			);
		}

		const pessoaAux = {
			cdPessoa: pessoaCadastrada.dataValues.cdPessoa,
			cdEmpresa: empresaSelecionada,
			nome: pessoaEntradaDTO.nome,
			dtNasc: pessoaEntradaDTO.dtNasc,
			rg: pessoaEntradaDTO.rg,
			email: pessoaEntradaDTO.email,
			ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
			cliente: pessoaEntradaDTO.cliente ? 1 : 0, // Converte boolean para TINYINT
			empresa: pessoaEntradaDTO.empresa ? 1 : 0, // Converte boolean para TINYINT
			imagem: "",
			usuInclusao: dadosToken.cdUsuario,
			dtHrInclusao: new Date(),
			usuAlteracao: dadosToken.cdUsuario,
			dtHrAlteracao: new Date(),
		};
		await this.pessoasRepository.cadastrarPessoaAux(pessoaAux);


		if (pessoaEntradaDTO.funcionario) {
			const funcionario = {
				cdFuncionario: pessoaCadastrada.dataValues.cdPessoa,
				cdCliente: pessoaEntradaDTO.cdCliente,
				cdEmpresa: empresaSelecionada,
				dtInicio: pessoaEntradaDTO.dtInicio,
				cargoFuncionario: pessoaEntradaDTO.cargo,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuInclusao: dadosToken.cdUsuario,
				dtHrInclusao: new Date(),
			};

			await this.pessoasRepository.cadastrarFuncionarioCliente(funcionario);
		}
		if (pessoaEntradaDTO.cliente) {
			const clienteEmpresa = {
				cdCliente: pessoaCadastrada.dataValues.cdPessoa,
				cdEmpresa: empresaSelecionada,
				dtInicio: pessoaEntradaDTO.dtInicio,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuInclusao: dadosToken.cdUsuario,
				dtHrInclusao: new Date(),
			};

			await this.pessoasRepository.cadastrarClienteEmpresa(clienteEmpresa);
		}
	}

	async alterarPessoa(
		pessoaEntradaDTO: PessoaEntradaDTO,
		dadosToken: PermissoesLoginOut,
		empresaSelecionada: number
	) {
		const pessoaCadastrada = await this.pessoasRepository.getById(
			pessoaEntradaDTO.cdPessoa!)
		if (!pessoaCadastrada) {
			throw new Error("Pessoa não encontrada");
		}	

		const funcionarioCadastrado = await this.pessoasRepository.getFuncionarioById(
			pessoaEntradaDTO.cdPessoa!,
			pessoaEntradaDTO.cdCliente!
		);

		if (funcionarioCadastrado === null && pessoaEntradaDTO.funcionario == true) {
			const funcionario = {
				cdFuncionario: pessoaEntradaDTO.cdPessoa,
				cdCliente: pessoaEntradaDTO.cdCliente,
				cdEmpresa: empresaSelecionada,
				dtInicio: pessoaEntradaDTO.dtInicio,
				cargoFuncionario: pessoaEntradaDTO.cargo,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuInclusao: dadosToken.cdUsuario,
				dtHrInclusao: new Date(),
			};

			await this.pessoasRepository.cadastrarFuncionarioCliente(funcionario);
		} else if (funcionarioCadastrado && pessoaEntradaDTO.funcionario == true) {
			const funcionario = {
				cdFuncionario: pessoaEntradaDTO.cdPessoa,
				cdCliente: pessoaEntradaDTO.cdCliente,
				cdEmpresa: empresaSelecionada,
				dtInicio: pessoaEntradaDTO.dtInicio,
				cargoFuncionario: pessoaEntradaDTO.cargo,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuAlteracao: dadosToken.cdUsuario,
				dtHrAlteracao: new Date(),
			};
			await this.pessoasRepository.alterarFuncionarioCliente(funcionario);
		} else if (funcionarioCadastrado && pessoaEntradaDTO.funcionario == false) {
			const funcionario = {
				cdFuncionario: pessoaEntradaDTO.cdPessoa,
				cdCliente: pessoaEntradaDTO.cdCliente,
				cdEmpresa: empresaSelecionada,
				ativo: 0, // Converte boolean para TINYINT
				usuAlteracao: dadosToken.cdUsuario,
				dtHrAlteracao: new Date(),
			};
			await this.pessoasRepository.alterarFuncionarioCliente(funcionario);
		}

		const clienteCadastrado = await this.pessoasRepository.getClienteById(
			pessoaEntradaDTO.cdPessoa!,
			empresaSelecionada!
		);

		if (clienteCadastrado === null && pessoaEntradaDTO.cliente == true) {
			const clienteEmpresa = {
				cdCliente: pessoaEntradaDTO.cdPessoa,
				cdEmpresa: empresaSelecionada,
				dtInicio: pessoaEntradaDTO.dtInicio,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuInclusao: dadosToken.cdUsuario,
				dtHrInclusao: new Date(),
			};

			await this.pessoasRepository.cadastrarClienteEmpresa(clienteEmpresa);
		} else if (clienteCadastrado && pessoaEntradaDTO.cliente == true) {
			const clienteEmpresa = {
				cdCliente: pessoaEntradaDTO.cdPessoa,
				cdEmpresa: empresaSelecionada,
				dtInicio: pessoaEntradaDTO.dtInicio,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuAlteracao: dadosToken.cdUsuario,
				dtHrAlteracao: new Date(),
			};

			await this.pessoasRepository.alterarClienteEmpresa(clienteEmpresa);
		} else if (clienteCadastrado && pessoaEntradaDTO.cliente == false) {
			const clienteEmpresa = {
				cdCliente: pessoaEntradaDTO.cdPessoa,
				cdEmpresa: empresaSelecionada,
				ativo: 0, // Converte boolean para TINYINT
				usuAlteracao: dadosToken.cdUsuario,
				dtHrAlteracao: new Date(),
			};

			await this.pessoasRepository.alterarClienteEmpresa(clienteEmpresa);
		}

		const pessoaAux = {
			cdPessoa: pessoaCadastrada.dataValues.cdPessoa,
			cdEmpresa: empresaSelecionada,
			nome: pessoaEntradaDTO.nome,
			dtNasc: pessoaEntradaDTO.dtNasc,
			rg: pessoaEntradaDTO.rg,
			email: pessoaEntradaDTO.email,
			ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
			cliente: pessoaEntradaDTO.cliente ? 1 : 0, // Converte boolean para TINYINT
			empresa: pessoaEntradaDTO.empresa ? 1 : 0, // Converte boolean para TINYINT
			imagem: "",
			usuAlteracao: dadosToken.cdUsuario,
			dtHrAlteracao: new Date(),
		};
		await this.pessoasRepository.alterarPessoaAux(pessoaAux);
	}
}
