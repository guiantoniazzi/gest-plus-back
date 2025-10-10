import { Login } from "../dto/login";
import { PermissoesLogin } from "../dto/permissoesLogin";
import { con } from "./connection";

export class LoginRepository {
    constructor() {
    }
    // TODO: CRIPTOGRAFATION DA PASSWORD
    async validarCredenciais(login: Login): Promise<PermissoesLogin[]> {
        try {
            const [results]: [any[], any] = await con.query("CALL VERIFICAR_LOGIN(?, ?)", [login.usuario, login.senha]); 
            
            if (!results || results.length === 0) {
                throw new Error('Usuário não encontrado');
            }
            
            return results[0] as PermissoesLogin[];
        }
        catch (error) {
            throw error;
        }
    }
}