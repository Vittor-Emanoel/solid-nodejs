import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch User Check-in history Use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should be able to fetch check in history", async () => {
    await checkInsRepository.create({
      gym_id: "gym1",
      user_id: "user_id1",
    });

    await checkInsRepository.create({
      gym_id: "gym2",
      user_id: "user_id1",
    });

    const { checkIns } = await sut.execute({
      userId: "user_id1",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym1" }),
      expect.objectContaining({ gym_id: "gym2" }),
    ]);
  });

  it("should be able to fetch paginated check in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym${i}`,
        user_id: "user_id1",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user_id1",
      page: 2,
    });

    expect(expect);
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym21" }),
      expect.objectContaining({ gym_id: "gym22" }),
    ]);
  });
});
