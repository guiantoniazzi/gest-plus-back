import { PermissoesLogin } from "../model/permissoesLogin";
import jwt from "jsonwebtoken";

export class TokenService {
	constructor() {}

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

	validarToken(token: string): boolean {
		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET_KEY || "Wzc123A@MaRG!tyv99z@c"
			);
			if (typeof decoded === "object" && decoded !== null && 'permissoesLogin' in decoded) {
				return true;
			}
			return false;
		} catch (error) {
			console.error("Erro ao validar token:", error);
			return false;
		}
	}
}
