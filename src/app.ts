import fastify from "fastify";
import { z } from "zod";
import { usersRoutes } from "./http/controllers/users/routes";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})
app.register(fastifyCookie)
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInRoutes)


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