export default class PessoaEntradaDTO {
    ativo!: boolean;
    cargo?: number;
    cdCliente?: number;
    cdPessoa?: number;
    cliente!: boolean;
    cpfCnpj!: string;
    dtInicio?: Date;
    dtNasc!: Date;
    email!: string;
    empresa!: boolean;
    funcionario!: boolean;
    nome!: string;
    rg?: string;
}