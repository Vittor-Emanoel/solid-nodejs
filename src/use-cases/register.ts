import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface IRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: IRegisterUseCaseRequest) {
  const password_hash = await hash(password, 6);

  const usersWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (usersWithSameEmail) {
    throw new Error("Email already exists");
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
