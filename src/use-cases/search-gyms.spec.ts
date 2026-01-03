import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search gym Use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to fetch search for gyms", async () => {
    await gymsRepository.create({
      title: "javascript-gym",
      description: null,
      phone: null,
      latitude: -23.6550689,
      longitude: -46.6295097,
    });

    await gymsRepository.create({
      title: "typescript-gym",
      description: null,
      phone: null,
      latitude: -23.6550689,
      longitude: -46.6295097,
    });

    const { gyms } = await sut.execute({
      query: "javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "javascript-gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `typescript-gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.6550689,
        longitude: -46.6295097,
      });
    }

    const { gyms } = await sut.execute({
      query: "typescript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "typescript-gym 21" }),
      expect.objectContaining({ title: "typescript-gym 22" }),
    ]);
  });
});
