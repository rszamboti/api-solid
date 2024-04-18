import { z } from "zod";
import {FastifyRequest, FastifyReply } from "fastify";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply){
    const searchGymBody = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { query, page } = searchGymBody.parse(request.body);

    const make = makeSearchGymsUseCase();
    const { gyms } = await make.execute({
            query,
            page
        });

    
    return reply.status(201).send({
        gyms
    });
}