import jwt from "jsonwebtoken";
import { FuncoesSistemaService } from "./funcoesSistemaService";
import { PermissoesLogin } from "../dto/permissoesLogin";
import { PermissoesLoginOut } from "../dto/permissoesLoginOut";

export class TokenService {
	private funcoesSistemaService: FuncoesSistemaService;

	constructor() {
		this.funcoesSistemaService = new FuncoesSistemaService();
	}

	gerarToken(permissoesLogin: PermissoesLoginOut): string {
		const token = jwt.sign(
			{
				permissoesLogin,
			},
			process.env.JWT_SECRET_KEY || "Wzc123A@MaRG!tyv99z@c",
			{ expiresIn: "1h" }
		);

		return token;
	}

	async validarToken(token: string, acao: number, empresaSelecionada?: number): Promise<boolean> {
		try {
			// Decodificar o token
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET_KEY || "Wzc123A@MaRG!tyv99z@c"
			);

			if (
				typeof decoded === "object" &&
				decoded !== null &&
				"permissoesLogin" in decoded
			) {
				// Obter a lista de funções do token
				// const listFuncs = decoded.permissoesLogin.cdFuncao
				// 	.split("|")
				// 	.map((cdFunc: string) => parseInt(cdFunc, 10));

				if (decoded.permissoesLogin.cdUsuario === "ADMIN") { 
					return true; // Admin tem todas as permissões
				}

				const listFuncs = decoded.permissoesLogin.empresa.flatMap((empresa: any) => {
					if(empresa.cdEmpresa == empresaSelecionada) {
						return empresa.cdFuncao;
					}
				});

				// Buscar os nomes das funções no banco de dados
				const codsFuncoes =
					await this.funcoesSistemaService.buscarFuncoesPorIds(listFuncs);

				// Verificar se a ação está presente nos nomes das funções
				return codsFuncoes.includes(acao);
			}

			return false;
		} catch (error) {
			console.error("Erro ao validar token:", error);
			return false;
		}
	}

	descripToken(token: string): PermissoesLoginOut {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY || "Wzc123A@MaRG!tyv99z@c"
		) as any;

		return decoded.permissoesLogin as PermissoesLoginOut;
	}
}
