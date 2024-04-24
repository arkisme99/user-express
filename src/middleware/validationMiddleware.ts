import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// import { StatusCodes } from "http-status-codes";
type SchemaType = z.ZodObject<any, any> | z.ZodEffects<any, any>;
export function validateData(schema: SchemaType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          //   .status(StatusCodes.BAD_REQUEST)
          .status(403)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          //   .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .status(500)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
