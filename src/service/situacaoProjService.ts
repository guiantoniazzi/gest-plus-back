import { SituacaoProjRepository } from "../repository/situacaoProjRepository";

export class SituacaoProjService {
    private situacaoProjRepository: SituacaoProjRepository;

    constructor() {
        this.situacaoProjRepository = new SituacaoProjRepository();
    }

    async getAll() {
        try {
            return await this.situacaoProjRepository.getAll();
        } catch (error) {
            throw error;
        }
    }
}