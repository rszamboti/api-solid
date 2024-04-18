import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsUseCase() {
    const Repository = new PrismaGymsRepository();
    const UseCase = new FetchNearbyGymsUseCase(Repository);
    return UseCase;
}