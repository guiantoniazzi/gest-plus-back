import PerfisAcesso from "../model/perfisAcesso";

export class PerfisAcessoRepository {
    constructor() {}

    async getPerfisComFuncoes() {
        try {
            const perfisAcesso = await PerfisAcesso.findAll({
                include: [
                    {
                        association: "funcoes", // Nome da associação definida no modelo
                        attributes: ["cdFuncao", "nomeFuncao"], // Campos que deseja retornar
                        where: { ativo: 1 }, // Filtrar apenas funções ativas
                        required: false, // Permitir perfis sem funções associadas
                    },
                ],
            });
            return perfisAcesso.map((perfil) => perfil.get({ plain: true })); // Retorna os dados como objetos simples
        } catch (error) {
            console.error("Erro ao buscar perfis de acesso:", error);
            throw error;
        }
    }

    async cadastrarPerfil(perfil: { nomePerfil: string; ativo: boolean }) {
        try {
            const novoPerfil = await PerfisAcesso.create(perfil);
            return novoPerfil;
        } catch (error) {
            console.error("Erro ao cadastrar perfil de acesso:", error);
            throw error;
        }
    }
}