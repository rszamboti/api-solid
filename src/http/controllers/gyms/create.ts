import { z } from "zod";
import {FastifyRequest, FastifyReply } from "fastify";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply){
    const createGymBody = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {return Math.abs(value) <= 90}),
        longitude: z.number().refine(value => {return Math.abs(value) <= 180}),
    })

    const { title, description, phone, latitude, longitude} = createGymBody.parse(request.body);

  

        const make = makeCreateGymUseCase();
        await make.execute({
            title,
            description,
            phone,
            latitude,
            longitude
        });

    
    return reply.status(201).send();
}