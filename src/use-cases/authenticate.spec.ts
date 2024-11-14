import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialErrors } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
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

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "faker@email.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialErrors);
  });

  it("should note be able to authenticate with wrong password", async () => {
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
