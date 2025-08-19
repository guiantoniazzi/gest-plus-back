class PermissoesLoginOut {
    cdUsuario!: string;
    cdPessoa!: number;
    empresa!: Empresa[];
}

class Empresa {
    cdEmpresa!: number;
    nomeEmpresa!: string;
    cdFuncao!: number[];
}

export { PermissoesLoginOut, Empresa };