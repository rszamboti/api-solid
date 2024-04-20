import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";


describe(' Metrics CheckIn  (e2e)', () => { // describe e2e
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get total count of check-in', async () => {
        
        const { token } = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow();

        const gym = await prisma.gym.create({
            data: {
                title: 'Javascript Gym',
                latitude: -23.0883472,
                longitude: -52.4572067,
            }
        })

        const CheckIns = await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
                {
                    gym_id: gym.id,
                    user_id: user.id,
                }
            ]
        })

        const response = await request(app.server)
            .get(`/chenck-ins/metrics`)
            .set('Authorization', `Bearer ${token}`)
            .send();

         expect(response.statusCode).toEqual(200)
         expect(response.body.checkInCount).toEqual(2)

    })



})
