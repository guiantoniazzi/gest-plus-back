import { Login } from '../model/login';
import { PermissoesLogin } from '../model/permissoesLogin';
import { LoginRepository } from '../repository/loginRepository';
import jwt from 'jsonwebtoken';

export class LoginService {
    private loginRepository: LoginRepository;

    constructor() {
        this.loginRepository = new LoginRepository();
    }

    async validarCredenciais(login: Login): Promise<PermissoesLogin> {
        const permissoesLogin = await this.loginRepository.validarCredenciais(login);

        if (!permissoesLogin) {
            throw new Error('Usuário não encontrado');
        }
        
        return permissoesLogin;
    }
}