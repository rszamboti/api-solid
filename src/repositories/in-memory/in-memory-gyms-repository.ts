import { Gym, Prisma } from "@prisma/client";
import { GymsRespository } from "../gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { title } from "process";

export class InMemoryGymsRepository implements GymsRespository{
    public items: Gym[] = [];
    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find(item => item.id === id)
        if(!gym) {
            return null
        }
        return gym
    }
    async create(data: Prisma.GymCreateInput){
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Decimal(data.latitude.toString()),
            longitude: new Decimal(data.longitude.toString()),
            created_at: new Date()
        } 
        
        this.items.push(gym)
        return gym
    }
    
        
}