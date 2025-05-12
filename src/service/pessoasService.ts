import { PermissoesLogin } from "../dto/permissoesLogin";
import PessoaEntradaDTO from "../dto/pessoasEntradaDTO";
import { con } from "../repository/connection";
import { PessoasRepository } from "../repository/pessoasRepository";

export class PessoasService {
	private pessoasRepository: PessoasRepository;

	constructor() {
		this.pessoasRepository = new PessoasRepository();
	}

	async getAll() {
		try {
			const result = await this.pessoasRepository.getAll();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async cadastrarPessoa(
		pessoaEntradaDTO: PessoaEntradaDTO,
		dadosToken: PermissoesLogin
	) {
		const pessoa = {
			tpPessoa: pessoaEntradaDTO.cpfCnpj.length > 11 ? "J" : "F", // Define se é pessoa física (F) ou jurídica (J)
			nome: pessoaEntradaDTO.nome,
			dtNasc: pessoaEntradaDTO.dataNascimento,
			cpfCnpj: pessoaEntradaDTO.cpfCnpj,
			rg: pessoaEntradaDTO.rg,
			email: pessoaEntradaDTO.email,
			ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
			cliente: pessoaEntradaDTO.cliente ? 1 : 0, // Converte boolean para TINYINT
			empresa: pessoaEntradaDTO.empresa ? 1 : 0, // Converte boolean para TINYINT
			usuInclusao: dadosToken.nome, // Usuário que está cadastrando (pode ser dinâmico)
			dtHrInclusao: new Date(), // Data/hora atual
		};

		const pessoaCadastrada = await this.pessoasRepository.cadastrarPessoa(
			pessoa
		);

		if (pessoaEntradaDTO.funcionario) {
			const funcionario = {
				cdFuncionario: pessoaCadastrada.dataValues.cdPessoa,
				cdCliente: pessoaEntradaDTO.cdCliente,
				dtInicio: pessoaEntradaDTO.dataInicio,
				cargoFuncionario: pessoaEntradaDTO.cargo,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuInclusao: dadosToken.nome,
				dtHrInclusao: new Date(),
			};

			await this.pessoasRepository.cadastrarFuncionarioCliente(funcionario);
		}
		if (pessoaEntradaDTO.cliente) {
			const clienteEmpresa = {
				cdCliente: pessoaCadastrada.dataValues.cdPessoa,
				cdEmpresa: pessoaEntradaDTO.empresaUsuario,
				dtInicio: pessoaEntradaDTO.dataInicio,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuInclusao: dadosToken.nome,
				dtHrInclusao: new Date(),
			};

			await this.pessoasRepository.cadastrarClienteEmpresa(clienteEmpresa);
		}
	}

	async alterarPessoa(
		pessoaEntradaDTO: PessoaEntradaDTO,
		dadosToken: PermissoesLogin
	) {
		const pessoaCadastrada = await this.pessoasRepository.getById(
			pessoaEntradaDTO.cdPessoa ?? 0)
		if (!pessoaCadastrada) {
			throw new Error("Pessoa não encontrada");
		}	

		const funcionarioCadastrado = await this.pessoasRepository.getFuncionarioById(
			pessoaEntradaDTO.cdPessoa ?? 0,
			pessoaEntradaDTO.cdCliente ?? 0
		);

		if (funcionarioCadastrado === null && pessoaEntradaDTO.funcionario == true) {
			const funcionario = {
				cdFuncionario: pessoaEntradaDTO.cdPessoa,
				cdCliente: pessoaEntradaDTO.cdCliente,
				dtInicio: pessoaEntradaDTO.dataInicio,
				cargoFuncionario: pessoaEntradaDTO.cargo,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuInclusao: dadosToken.nome,
				dtHrInclusao: new Date(),
			};

			await this.pessoasRepository.cadastrarFuncionarioCliente(funcionario);
		} else if (funcionarioCadastrado && pessoaEntradaDTO.funcionario == true) {
			const funcionario = {
				cdFuncionario: pessoaEntradaDTO.cdPessoa,
				cdCliente: pessoaEntradaDTO.cdCliente,
				dtInicio: pessoaEntradaDTO.dataInicio,
				cargoFuncionario: pessoaEntradaDTO.cargo,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuAlteracao: dadosToken.nome,
				dtHrAlteracao: new Date(),
			};
			await this.pessoasRepository.alterarFuncionarioCliente(funcionario);
		} else if (funcionarioCadastrado && pessoaEntradaDTO.funcionario == false) {
			const funcionario = {
				cdFuncionario: pessoaEntradaDTO.cdPessoa,
				cdCliente: pessoaEntradaDTO.cdCliente,
				ativo: 0, // Converte boolean para TINYINT
				usuAlteracao: dadosToken.nome,
				dtHrAlteracao: new Date(),
			};
			await this.pessoasRepository.alterarFuncionarioCliente(funcionario);
		}

		const clienteCadastrado = await this.pessoasRepository.getClienteById(
			pessoaEntradaDTO.cdPessoa ?? 0,
			pessoaEntradaDTO.empresaUsuario ?? 0
		);

		if (clienteCadastrado === null && pessoaEntradaDTO.cliente == true) {
			const clienteEmpresa = {
				cdCliente: pessoaEntradaDTO.cdPessoa,
				cdEmpresa: pessoaEntradaDTO.empresaUsuario,
				dtInicio: pessoaEntradaDTO.dataInicio,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuInclusao: dadosToken.nome,
				dtHrInclusao: new Date(),
			};

			await this.pessoasRepository.cadastrarClienteEmpresa(clienteEmpresa);
		} else if (clienteCadastrado && pessoaEntradaDTO.cliente == true) {
			const clienteEmpresa = {
				cdCliente: pessoaEntradaDTO.cdPessoa,
				cdEmpresa: pessoaEntradaDTO.empresaUsuario,
				dtInicio: pessoaEntradaDTO.dataInicio,
				ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
				usuAlteracao: dadosToken.nome,
				dtHrAlteracao: new Date(),
			};

			await this.pessoasRepository.alterarClienteEmpresa(clienteEmpresa);
		} else if (clienteCadastrado && pessoaEntradaDTO.cliente == false) {
			const clienteEmpresa = {
				cdCliente: pessoaEntradaDTO.cdPessoa,
				cdEmpresa: pessoaEntradaDTO.empresaUsuario,
				ativo: 0, // Converte boolean para TINYINT
				usuAlteracao: dadosToken.nome,
				dtHrAlteracao: new Date(),
			};

			await this.pessoasRepository.alterarClienteEmpresa(clienteEmpresa);
		}

		const pessoa = {
			cdPessoa: pessoaEntradaDTO.cdPessoa,
			tpPessoa: pessoaEntradaDTO.cpfCnpj.length > 11 ? "J" : "F", // Define se é pessoa física (F) ou jurídica (J)	
			nome: pessoaEntradaDTO.nome,
			dtNasc: pessoaEntradaDTO.dataNascimento,
			cpfCnpj: pessoaEntradaDTO.cpfCnpj,
			rg: pessoaEntradaDTO.rg,
			email: pessoaEntradaDTO.email,
			ativo: pessoaEntradaDTO.ativo ? 1 : 0, // Converte boolean para TINYINT
			cliente: pessoaEntradaDTO.cliente ? 1 : 0, // Converte boolean para TINYINT
			empresa: pessoaEntradaDTO.empresa ? 1 : 0, // Converte boolean para TINYINT
			usuAlteracao: dadosToken.nome, // Usuário que está cadastrando (pode ser dinâmico)
			dtHrAlteracao: new Date(), // Data/hora atual
		};
		await this.pessoasRepository.alterarPessoa(pessoa);
	}
}
