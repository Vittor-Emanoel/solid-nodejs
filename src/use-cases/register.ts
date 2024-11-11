import { IUsersRepository } from "@/repositories/IUsersRepository";
import { hash } from "bcryptjs";

interface IRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const usersWithSameEmail = await this.usersRepository.findByEmail(email);

    if (usersWithSameEmail) {
      throw new Error("Email already exists");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
