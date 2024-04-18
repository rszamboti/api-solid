import { CreateGymUseCase } from "../create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase() {
    const Repository = new PrismaGymsRepository();
    const UseCase = new CreateGymUseCase(Repository);
    return UseCase;
}