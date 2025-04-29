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

    async deleteFuncoesPerfil(cdPerfil: number, idsFuncs: number[], usuAlteracao: string) {
        try {
            return idsFuncs.forEach(idFunc => {
                FuncoesPerfil.destroy({
                    where: {
                        cdPerfil,
                        cdFuncao: idFunc
                    },
                    individualHooks: true,
                    hooks: true
                })
            });
        } catch (error) {
            console.error("Erro ao buscar funções do sistema:", error);
            throw error;
        }
    }

    async getFuncoesPerfil(cdPerfil: number) {
        try {
            const funcoesPerfil = await FuncoesPerfil.findAll({
                where: { cdPerfil },
                attributes: ["cdFuncao"],
            });
            return funcoesPerfil.map((funcao) => funcao.get({ plain: true })); // Retorna os dados como objetos simples
        } catch (error) {
            console.error("Erro ao buscar funções do sistema:", error);
            throw error;
        }
    }
}