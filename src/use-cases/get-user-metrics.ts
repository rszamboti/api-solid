import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsUseCaseRequest {
    userId  : string
}

interface GetUserMetricsUseCaseResponse {
    checkInCount: number
}

export class GetUserMetricsUseCase {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({
        userId,
    }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkInCount = await this.checkInRepository.countByUserId(userId)
        return {
            checkInCount
        }
    }
}