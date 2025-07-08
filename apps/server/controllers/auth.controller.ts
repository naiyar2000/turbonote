import { Request, Response } from "express";
import { auth } from "../utils/firebase";
import { PrismaClient } from "@repo/db/prisma/generated/client";

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  if (!idToken) return res.status(400).json({ error: "Token required" });

  try {
    const decoded = await auth.verifyIdToken(idToken);
    const { email, name, picture, uid } = decoded;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { email, name, image: picture },
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log("Fetching user with email:", email);
  if (!email) return res.status(400).json({ error: "User ID required" });

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
