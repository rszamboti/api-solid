import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { GymsRespository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import dayjs from "dayjs";

interface ValidateCheckinUseCaseRequest {
    checkInId: string
}

interface ValidateCheckinUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckinUseCase {
    constructor(private checkInsRepository: CheckInRepository) {}

    async execute({
        checkInId
    }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId)
        if(!checkIn) {
            throw new ResourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes');

        if(distanceInMinutesFromCheckInCreation > 20) {
            throw new Error()
        }

        
        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}