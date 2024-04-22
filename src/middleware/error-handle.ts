import { NextFunction, Request, Response } from "express";

function errorHandle(
  err: TypeError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(500).json({
    status: err.name,
    message: err.message,
  });
}

export default errorHandle;
