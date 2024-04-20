import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";

export async function checkInRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt);


    app.get('/chenck-ins/history',history)
    app.get('/chenck-ins/metrics',metrics)

    app.post('/gyms/:gymId/check-ins', create)
    app.patch('/check-ins/:checkInId/validate',validate)


}