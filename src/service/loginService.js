"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const loginRepository_1 = require("../repository/loginRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginService {
    constructor() {
        this.loginRepository = new loginRepository_1.LoginRepository();
    }
    validarCredenciais(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const permissoesLogin = yield this.loginRepository.validarCredenciais(login);
            if (!permissoesLogin) {
                throw new Error('Usuário não encontrado');
            }
            return permissoesLogin;
        });
    }
    gerarToken(permissoesLogin) {
        const token = jsonwebtoken_1.default.sign({
            permissoesLogin
        }, process.env.JWT_SECRET_KEY || "Wzc123A@MaRG!tyv99z@c", { expiresIn: '1h' });
        return token;
    }
}
exports.LoginService = LoginService;
