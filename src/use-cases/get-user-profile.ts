import { IUsersRepository } from "@/repositories/IUsersRepository";
import type { User } from "@prisma/client";
import { ResourceNotFoundErrors } from "./errors/resource-not-found-error";

interface IGetUserProfileUseCaseRequest {
  userId: string;
}

interface IGetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundErrors();
    }

    return {
      user,
    };
  }
}
