import Atividade from "../model/atividade";
import PessoaAtividade from "../model/pessoaAtividade";
import Pessoa from "../model/pessoa";
import SituacaoProj from "../model/situacaoProj";
import PessoaAux from "../model/pessoaAux";

export class AtividadeRepository {
    constructor() { }

    // Busca todas as atividades, pessoas alocadas (PessoaAux) e descrição do status
    async getAll() {
        try {
            const atividades = await Atividade.findAll({
                include: [
                    {
                        model: PessoaAtividade,
                        as: "pessoasAtividade",
                        include: [
                            {
                                model: PessoaAux,
                                as: "pessoaAux"
                            }
                        ]
                    },
                    {
                        model: SituacaoProj,
                        as: "situacaoProj"
                    }
                ]
            });
            return atividades;
        } catch (error) {
            console.error("Erro ao buscar atividades:", error);
            throw error;
        }
    }

    // Busca atividade por chave primária, incluindo pessoas alocadas (PessoaAux) e status
    async getById(cdAtiv: number) {
        try {
            const atividade = await Atividade.findOne({
                where: { cdAtiv },
                include: [
                    {
                        model: PessoaAtividade,
                        as: "pessoasAtividade",
                        include: [
                            {
                                model: PessoaAux,
                                as: "pessoaAux"
                            }
                        ]
                    },
                    {
                        model: SituacaoProj,
                        as: "situacaoProj"
                    }
                ]
            });
            return atividade;
        } catch (error) {
            console.error("Erro ao buscar atividade por ID:", error);
            throw error;
        }
    }

    // Altera os dados da atividade
    async alterar(atividade: any) {
        try {
            const result = await Atividade.update(atividade, {
                where: { cdAtiv: atividade.cdAtiv }
            });
            return result;
        } catch (error) {
            console.error("Erro ao alterar atividade:", error);
            throw error;
        }
    }

    // Aloca uma pessoa na atividade
    async alocar(alocacao: any) {
        try {
            const novaAlocacao = await PessoaAtividade.create(alocacao);
            return novaAlocacao;
        } catch (error) {
            console.error("Erro ao alocar pessoa na atividade:", error);
            throw error;
        }
    }

    // Desaloca uma pessoa da atividade
    async desalocar(cdPessoa: number, cdAtiv: number) {
        try {
            const result = await PessoaAtividade.destroy({
                where: { cdPessoa, cdAtiv }
            });
            return result;
        } catch (error) {
            console.error("Erro ao desalocar pessoa da atividade:", error);
            throw error;
        }
    }

    // Altera a alocação de uma pessoa na atividade
    async alterarAlocacao(alocacao: any) {
        try {
            const result = await PessoaAtividade.update(alocacao, {
                where: { cdPessoa: alocacao.cdPessoa, cdAtiv: alocacao.cdAtiv }
            });
            return result;
        } catch (error) {
            console.error("Erro ao alterar alocação:", error);
            throw error;
        }
    }

    async cadastrar(atividade: any) {
        try {
            const novaAtividade = await Atividade.create(atividade);
            return novaAtividade;
        } catch (error) {
            console.error("Erro ao cadastrar atividade:", error);
            throw error;
        }
    }
}

export default AtividadeRepository;