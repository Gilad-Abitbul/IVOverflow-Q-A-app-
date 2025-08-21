import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(20, "Full name must be at most 20 characters"),
  nickname: z
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .max(20, "Nickname must be at most 20 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol"
    ),
});
