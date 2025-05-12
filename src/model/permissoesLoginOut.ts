class PermissoesLoginOut {
    cdUsuario!: string;
    cdPessoa!: number;
    nome!: string;
    empresa!: Empresa[];
}

class Empresa {
    cdEmpresa!: number;
    nomeEmpresa!: string;
    cdFuncao!: number[];
}

export { PermissoesLoginOut, Empresa };