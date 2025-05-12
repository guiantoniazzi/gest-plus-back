import { PermissoesLogin } from "../dto/permissoesLogin";
import PessoaEntradaDTO from "../dto/pessoasEntradaDTO";
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

			await this.pessoasRepository.cadastrarFuncionarioCliente(
				funcionario
			);
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
}
