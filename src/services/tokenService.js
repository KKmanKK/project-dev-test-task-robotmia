import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "15h",
    });
    return {
      accessToken,
    };
  }
}
export const tokenService = new TokenService();
