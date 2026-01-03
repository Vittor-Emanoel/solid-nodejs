import type { IGymsRepository } from "@/repositories/IGymsRepository";
import type { Gym } from "@prisma/client";

interface IFetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymsUseCaseRequest): Promise<IFetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
