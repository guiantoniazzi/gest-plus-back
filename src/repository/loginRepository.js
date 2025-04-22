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
exports.LoginRepository = void 0;
const connection_1 = __importDefault(require("./connection"));
class LoginRepository {
    constructor() {
    }
    validarCredenciais(login) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [results] = yield connection_1.default.query("CALL VERIFICAR_LOGIN(?, ?)", [login.usuario, login.senha]);
                if (!results || results.length === 0) {
                    throw new Error('Usuário não encontrado');
                }
                return results[0][0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.LoginRepository = LoginRepository;
