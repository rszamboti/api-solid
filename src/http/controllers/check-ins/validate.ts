import { z } from "zod";
import {FastifyRequest, FastifyReply } from "fastify";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";


export async function validate(request: FastifyRequest, reply: FastifyReply){
    const validateCheckinParams = z.object({
        checkInId: z.string(),
    })
    
    const { checkInId } = validateCheckinParams.parse(request.params); 
    

        const make = makeValidateCheckInUseCase();
        await make.execute({
            checkInId
        });

    
    return reply.status(204).send();
}