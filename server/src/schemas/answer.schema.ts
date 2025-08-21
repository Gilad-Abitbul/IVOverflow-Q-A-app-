import { z } from "zod";

export const answerSchema = z.object({
  body: z
    .string()
    .min(10, "Answer must be at least 10 characters")
    .max(250, "Answer must be no more than 250 characters"),
});
