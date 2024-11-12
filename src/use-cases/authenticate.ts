import { IUsersRepository } from "@/repositories/IUsersRepository";
import type { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialErrors } from "./errors/invalid-credentials-error";

interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface IAuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialErrors();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialErrors();
    }

    return {
      user,
    };
  }
}
