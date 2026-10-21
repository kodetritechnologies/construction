import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "kodetrisecrect_default_jwt_secret";

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
