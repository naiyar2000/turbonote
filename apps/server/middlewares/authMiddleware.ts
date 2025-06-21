import { Request, Response, NextFunction } from "express";
import { auth } from "../utils/firebase";

export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
