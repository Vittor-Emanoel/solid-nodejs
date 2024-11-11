import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

export const app = fastify();

const prisma = new PrismaClient({
  log: ["query"],
});

prisma.user.create({
  data: {
    name: "ew",
    email: "awdwad",
  },
});
