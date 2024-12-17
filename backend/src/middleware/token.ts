import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

class TokenService {
  public static generateToken(id: number, email: string, username: string, role: string): string {
    const payload = { id: id, email: email, username: username, role: role };
    const privateKeyPath = process.env.PRIVATE_KEY_PATH;

    if (!privateKeyPath || !fs.existsSync(privateKeyPath)) {
      throw new Error(`JWT private key file not found at path: ${privateKeyPath}`);
    }
    // returns the contents of the file as a string
    const privateKey = fs.readFileSync(path.resolve(privateKeyPath), "utf8");
    // creates the jwt using the payload and private key
    // uses the algorithm RS256 to produce a signature that is a JSON Web Signature (JWS)
    const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });
    return token;
  }

  public static verifyToken(token: string) {
    const publicKeyPath = process.env.PUBLIC_KEY_PATH;

    if (!publicKeyPath) {
      throw new Error("JWT key not found");
    }

    // returns the contents of the file as a string
    const publicKey = fs.readFileSync(path.resolve(publicKeyPath), "utf8");
    // verifies the token using the public key
    return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
  }
}

export default TokenService;
