import Cargo from "../model/cargo";

export class CargoRepository {
    constructor() {}

    async getAll() {
        try {
            const cargos = await Cargo.findAll();
            return cargos;
        } catch (error) {
            console.error("Erro ao buscar cargos:", error);
            throw error;
        }
    }

    async getById(cdCargo: number) {
        try {
            const cargo = await Cargo.findOne({
                where: { cdCargo },
            });
            return cargo;
        } catch (error) {
            console.error("Erro ao buscar cargo por ID:", error);
            throw error;
        }
    }

    async cadastrarCargo(cargo: any) {
        try {
            const novoCargo = await Cargo.create(cargo);
            return novoCargo;
        } catch (error) {
            console.error("Erro ao cadastrar cargo:", error);
            throw error;
        }
    }

    async alterarCargo(cargo: any) {
        try {
            const cargoAlterado = await Cargo.update(cargo, {
                where: { cdCargo: cargo.cdCargo },
            });
            return cargoAlterado;
        } catch (error) {
            console.error("Erro ao alterar cargo:", error);
            throw error;
        }
    }
}