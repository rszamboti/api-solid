import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";


describe(' Validate CheckIn  (e2e)', () => { // describe e2e
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to validate check-in', async () => {
        
        const { token } = await createAndAuthenticateUser(app,true);

        const user = await prisma.user.findFirstOrThrow();

        const gym = await prisma.gym.create({
            data: {
                title: 'Javascript Gym',
                latitude: -23.0883472,
                longitude: -52.4572067,
            }
        })

        let CheckIns = await prisma.checkIn.create({
            data: 
                {
                    gym_id: gym.id,
                    user_id: user.id,
                }
        })

        const response = await request(app.server)
            .patch(`/check-ins/${CheckIns.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send();

         expect(response.statusCode).toEqual(204)
        
         
         CheckIns = await prisma.checkIn.findUniqueOrThrow({
             where: {
                 id: CheckIns.id
             }
         })

         expect(CheckIns.validated_at).toEqual(expect.any(Date))


    })



})
