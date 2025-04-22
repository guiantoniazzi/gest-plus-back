import { conSequelize } from "./connection";
import { QueryTypes } from "sequelize";

export class PessoasRepository {
    constructor() {
    }

    getAll() {
        return conSequelize.query("SELECT * FROM pessoas", { type: QueryTypes.SELECT });
    }
}