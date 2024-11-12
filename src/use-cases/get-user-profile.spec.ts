import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundErrors } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe("Get Profile Use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      id: "user-1",
      name: "vittor111",
      email: "vin@gmail.com",
      password_hash: await hash("1234567", 6),
      created_at: Date(),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("vittor111");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-exists-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundErrors);
  });
});
