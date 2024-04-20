import { z } from "zod";
import {FastifyRequest, FastifyReply } from "fastify";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-usa-case";


export async function history(request: FastifyRequest, reply: FastifyReply){
    const searchGymBody = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = searchGymBody.parse(request.query);

    const make = makeFetchUserCheckInsHistoryUseCase();
    const { checkIn } = await make.execute({
            userId: request.user.sub,
            page
        });

    
    return reply.status(200).send({
        checkIn
    });
}