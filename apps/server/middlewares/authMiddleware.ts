import { Request, Response, NextFunction } from "express";
import { auth } from "../utils/firebase";
import { PrismaClient } from "@repo/db/prisma/generated/client";

const prisma = new PrismaClient();

export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const { email } = decodedToken;
    const userData = await prisma.user.findUnique({ where: { email } })
    if (userData?.email) {
      (req as any).user = userData;
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
