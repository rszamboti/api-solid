import { SearchGymsUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
    const Repository = new PrismaGymsRepository();
    const UseCase = new SearchGymsUseCase(Repository);
    return UseCase;
}