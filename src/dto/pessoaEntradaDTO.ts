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
    funcionario!: boolean;
    nome!: string;
    rg?: string;
}