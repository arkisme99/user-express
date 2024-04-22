import { NextFunction, Request, Response } from "express";

function notFound(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({
    status: "notFound",
    message: "Resource Not found",
  });
}

export default notFound;
