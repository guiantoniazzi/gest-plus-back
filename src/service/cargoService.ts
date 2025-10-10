import { CargoRepository } from "../repository/cargoRepository";

export class CargoService {
    private cargoRepository: CargoRepository;

    constructor() {
        this.cargoRepository = new CargoRepository();
    }

    async getAll() {
        try {
            return await this.cargoRepository.getAll();
        } catch (error) {
            throw error;
        }
    }

    async getById(cdCargo: number) {
        try {
            return await this.cargoRepository.getById(cdCargo);
        } catch (error) {
            throw error;
        }
    }

    async cadastrarCargo(cargo: any) {
        try {
            return await this.cargoRepository.cadastrarCargo(cargo);
        } catch (error) {
            throw error;
        }
    }

    async alterarCargo(cargo: any) {
        try {
            return await this.cargoRepository.alterarCargo(cargo);
        } catch (error) {
            throw error;
        }
    }
}