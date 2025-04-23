import jwt from "jsonwebtoken";
import { FuncoesSistemaService } from "./funcoesSistemaService";
import { PermissoesLogin } from "../model/permissoesLogin";

export class TokenService {
    private funcoesSistemaService: FuncoesSistemaService;

    constructor() {
        this.funcoesSistemaService = new FuncoesSistemaService();
    }

    gerarToken(permissoesLogin: PermissoesLogin): string {
        const token = jwt.sign(
            {
                permissoesLogin,
            },
            process.env.JWT_SECRET_KEY || "Wzc123A@MaRG!tyv99z@c",
            { expiresIn: "1h" }
        );

        return token;
    }

    async validarToken(token: string, acao: number): Promise<boolean> {
        try {
            // Decodificar o token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY || "Wzc123A@MaRG!tyv99z@c"
            );

            if (typeof decoded === "object" && decoded !== null && "permissoesLogin" in decoded) {
                // Obter a lista de funções do token
                const listFuncs = decoded.permissoesLogin.cdFuncao
                    .split("|")
                    .map((cdFunc: string) => parseInt(cdFunc, 10));

                // Buscar os nomes das funções no banco de dados
                const codsFuncoes = await this.funcoesSistemaService.buscarFuncoesPorIds(listFuncs);

                // Verificar se a ação está presente nos nomes das funções
                return codsFuncoes.includes(acao);
            }

            return false;
        } catch (error) {
            console.error("Erro ao validar token:", error);
            return false;
        }
    }
}