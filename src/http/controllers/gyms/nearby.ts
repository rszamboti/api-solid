import { z } from "zod";
import {FastifyRequest, FastifyReply } from "fastify";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply){
    const GymBody = z.object({
        latitude: z.coerce.number().refine(value => {return Math.abs(value) <= 90}),
        longitude: z.coerce.number().refine(value => {return Math.abs(value) <= 180}),
    })

    const { latitude, longitude } = GymBody.parse(request.query);
    console.log({latitude, longitude})
    const make = makeFetchNearbyGymsUseCase();
    const { gyms } = await make.execute({
            userLatitude: latitude,
            userLongitude: longitude
        });

    
    return reply.status(200).send({
        gyms
    });
}