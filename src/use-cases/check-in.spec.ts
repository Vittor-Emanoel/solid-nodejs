import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym_id1",
      title: "ts",
      description: "aqui vc aprender",
      latitute: new Decimal(-23.6812632),
      longitute: new Decimal(-46.660879),
      phone: "",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym_id1",
      userId: "user_id1",
      userLatitude: -23.6812632,
      userLongitude: -46.660879,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym_id1",
      userId: "user_id1",
      userLatitude: -23.6812632,
      userLongitude: -46.660879,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym_id1",
        userId: "user_id1",
        userLatitude: -23.6812632,
        userLongitude: -46.660879,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym_id1",
      userId: "user_id1",
      userLatitude: -23.6812632,
      userLongitude: -46.660879,
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym_id1",
      userId: "user_id1",
      userLatitude: -23.6812632,
      userLongitude: -46.660879,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym_id2",
      title: "tss",
      description: "aqui vc aprender",
      latitute: new Decimal(-23.6550689),
      longitute: new Decimal(-46.6295097),
      phone: "",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym_id2",
        userId: "user_id1",
        userLatitude: -23.681263223,
        userLongitude: -46.660879,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
