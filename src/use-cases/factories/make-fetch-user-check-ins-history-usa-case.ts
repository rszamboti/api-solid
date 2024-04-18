import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FechUsercheckInsHistoryUseCase } from "../fech-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
    const Repository = new PrismaCheckInsRepository();
    const UseCase = new FechUsercheckInsHistoryUseCase(Repository);
    return UseCase;
}