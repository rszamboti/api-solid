import { z } from "zod";
import {FastifyRequest, FastifyReply } from "fastify";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";


export async function create(request: FastifyRequest, reply: FastifyReply){
    const createCheckInBody = z.object({
        gymId: z.string(),
    })
    const body = z.object({
        latitude: z.number().refine(value => {return Math.abs(value) <= 90}),
        longitude: z.number().refine(value => {return Math.abs(value) <= 180}),
    })

    const { gymId } = createCheckInBody.parse(request.params); 
    const { latitude, longitude } = body.parse(request.body);

        const make = makeCheckInUseCase();
        await make.execute({
            gymId,
            userLatitude: latitude,
            userLongitude: longitude,
            userId: request.user.sub
        });

    
    return reply.status(201).send();
}