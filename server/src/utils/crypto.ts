import crypto from "crypto";

export function hash(password: string): string {
  return crypto.createHash("sha512").update(password).digest("hex");
}

export function compare(password: string, hashed: string): boolean {
  return hash(password) === hashed;
}
