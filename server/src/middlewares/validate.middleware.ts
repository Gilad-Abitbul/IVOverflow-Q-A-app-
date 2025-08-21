import { treeifyError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = treeifyError(result.error);

      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    req.body = result.data;
    next();
  };
};
