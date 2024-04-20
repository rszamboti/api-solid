import { z } from "zod";
import {FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-usa-case";



export async function metrics(request: FastifyRequest, reply: FastifyReply){

    const make = makeGetUserMetricsUseCase();
    const { checkInCount } = await make.execute({
            userId: request.user.sub,
        });

    
    return reply.status(200).send({
        checkInCount
    });
}