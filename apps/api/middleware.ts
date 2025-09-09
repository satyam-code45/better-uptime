import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headers = req.headers.authorization;
  if (!headers) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  try {
   
    let data = jwt.verify(headers, process.env.JWT_SECRET!) as { userId?: string; sub?: string };
    req.userId = data.userId ?? data.sub;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Something went wrong. Please sign in again!",
    });
  }
}
