import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialErrors } from "./errors/invalid-credentials-error";

describe("Authenticate Use case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "vittor",
      email: "vittor@email.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "vittor@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should note be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "vittor3232@email.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialErrors);
  });

  it("should note be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "vittor",
      email: "vittor@email.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "vittor3232@email.com",
        password: "12121212",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialErrors);
  });
});
