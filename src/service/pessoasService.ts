import { PessoasRepository } from '../repository/pessoasRepository';

export class PessoasService {
    private pessoasRepository: PessoasRepository;

    constructor() {
        this.pessoasRepository = new PessoasRepository();
    }

    async getAll() {
        try {
            const result = await this.pessoasRepository.getAll();
            return result;
        } catch (error) {
            throw error;
        }
    }
}