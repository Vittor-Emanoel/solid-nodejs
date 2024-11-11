import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
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

  const usersRepository = new PrismaUsersRepository();

  await usersRepository.create({
    name,
    email,
    password_hash,
  });
}
