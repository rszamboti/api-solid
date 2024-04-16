import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";

interface FechUsercheckInsHistoryUseCaseRequest {
    userId  : string
    page    : number
}

interface FechUsercheckInsHistoryUseCaseResponse {
    checkIn: CheckIn[]
}

export class FechUsercheckInsHistoryUseCase {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({
        userId,
        page
    }: FechUsercheckInsHistoryUseCaseRequest): Promise<FechUsercheckInsHistoryUseCaseResponse> {
        const checkIn = await this.checkInRepository.findManyByUserId(userId,page)
        return {
            checkIn
        }
    }
}