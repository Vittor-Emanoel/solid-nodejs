import type { Gym } from "@prisma/client";

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
}
