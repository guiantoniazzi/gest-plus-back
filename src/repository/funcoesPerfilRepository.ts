import FuncoesPerfil from "../model/funcoesPerfil";

export class FuncoesPerfilRepository {
    constructor() {}

    async insertFuncoesPerfil(cdPerfil: number, idsFuncs: number[], usuInclusao: string) {
        try {
            return idsFuncs.forEach(idFunc => {
                FuncoesPerfil.create({
                    cdPerfil,
                    cdFuncao: idFunc,
                    usuInclusao
                })
            });
        } catch (error) {
            console.error("Erro ao buscar funções do sistema:", error);
            throw error;
        }
    }
}