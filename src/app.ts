
import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import { register } from "./http/controllers/register";
import { appRoutes } from "./http/routes";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);


app.setErrorHandler((error, _, reply) => {
    if( error instanceof z.ZodError) {
        return reply.status(400).send({message: 'Validation error.',issues: error.format()})
    }

    if(env.NODE_ENV !== 'production') {
        console.error(error)
    }else{
        // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({message: 'Internal server error.'})
})

/*
prisma.user.create({
    data: {
        name: "John Doe",
        email: "j9w7A@example.com",
    },
})

*/