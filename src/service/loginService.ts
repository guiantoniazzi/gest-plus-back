import { Login } from '../dto/login';
import { PermissoesLogin } from '../dto/permissoesLogin';
import { PermissoesLoginOut } from '../dto/permissoesLoginOut';
import { LoginRepository } from '../repository/loginRepository';
import jwt from 'jsonwebtoken';

export class LoginService {
    private loginRepository: LoginRepository;

    constructor() {
        this.loginRepository = new LoginRepository();
    }

    async validarCredenciais(login: Login): Promise<PermissoesLoginOut> {
        const permissoesLogin = await this.loginRepository.validarCredenciais(login);

        if (!permissoesLogin) {
            throw new Error('Usuário não encontrado');
        }

        var permissoesLoginOut: PermissoesLoginOut = {
            cdUsuario: permissoesLogin[0].cdUsuario,
            cdPessoa: permissoesLogin[0].cdPessoa,
            empresa: permissoesLogin.map(permissao => {
                return {
                    cdEmpresa: permissao.cdEmpresa,
                    nomeEmpresa: permissao.nomeEmpresa,
                    cdFuncao: permissao.cdFuncao.split('|').map((funcao: string) => parseInt(funcao, 10))
                };
            })
        };
        
        return permissoesLoginOut;
    }
}