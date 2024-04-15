import { Gym, Prisma } from "@prisma/client";

export interface GymsRespository{

    findById(id: string) : Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}