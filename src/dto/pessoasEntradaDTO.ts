export default class PessoaEntradaDTO {
    ativo!: boolean;
    cargo?: number;
    cdCliente?: number;
    cdPessoa?: number;
    cliente!: boolean;
    cpfCnpj!: string;
    dataInicio?: Date;
    dataNascimento!: Date;
    email!: string;
    empresa!: boolean;
    empresaUsuario!: number;
    funcionario!: boolean;
    nome!: string;
    rg?: string;
}