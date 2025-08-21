import jwt from "jsonwebtoken";

const JWT_SECRET = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("env error: can't find process.env.JWT_SECRET");
    process.exit(1);
  }
  return secret;
})();

type Payload = {
  uid: string;
};

export function generateToken(payload: Payload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): Payload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Payload;
    return decoded;
  } catch {
    return null;
  }
}
