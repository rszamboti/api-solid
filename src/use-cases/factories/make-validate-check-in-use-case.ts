import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckinUseCase } from "../validate.check-in";

export function makeValidateCheckInUseCase() {
    const Repository = new PrismaCheckInsRepository();
    const UseCase = new ValidateCheckinUseCase(Repository);
    return UseCase;
}