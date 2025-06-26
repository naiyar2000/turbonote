// server/db.ts

import { PrismaClient } from "./prisma/generated/client/index";

const prisma = new PrismaClient();

export default prisma;
