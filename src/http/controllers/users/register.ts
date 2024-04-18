import { prisma } from "@/lib/prisma";
import { z } from "zod";
import {FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerUserBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerUserBody.parse(request.body);

    try{

        const registerUseCase = makeRegisterUseCase();
        await registerUseCase.execute({ name, email, password });

    } catch(error) {
        if(error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({message: error.message});
        }
        
        throw error;
    }

    return reply.status(201).send();
}