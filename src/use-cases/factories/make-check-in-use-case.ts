import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInUseCase() {
    const Repository = new PrismaCheckInsRepository();
    const Gym = new PrismaGymsRepository();
    const UseCase = new CheckInUseCase(Repository, Gym);
    return UseCase;
}