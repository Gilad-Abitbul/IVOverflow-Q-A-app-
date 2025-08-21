import { z } from "zod";

export const questionSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(20, "Title must be at most 20 characters"),
  body: z
    .string()
    .min(5, "Body must be at least 5 characters")
    .max(200, "Body must be at most 200 characters"),
  tags: z
    .array(z.string().min(3, "Each tag must be at least 3 characters"))
    .optional(),
});
