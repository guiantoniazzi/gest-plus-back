import { SituacaoProjRepository } from "../repository/situacaoProjRepository";

export class SituacaoProjService {
    private situacaoProjRepository: SituacaoProjRepository;

    constructor() {
        this.situacaoProjRepository = new SituacaoProjRepository();
    }

    async getAll(atividade: boolean = false) {
        try {
            return await this.situacaoProjRepository.getAll(atividade);
        } catch (error) {
            throw error;
        }
    }
}