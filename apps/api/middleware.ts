import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headers = req.headers.authorization!;
  try {
   
    let data = jwt.verify(headers, process.env.JWT_SECRET!);
    req.userId = data as string;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Something went wrong. Please sign in again!",
    });
  }
}
