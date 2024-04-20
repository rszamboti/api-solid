import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";


describe(' Create Gyms (e2e)', () => { // describe e2e
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a gym', async () => {
        
        const { token } = await createAndAuthenticateUser(app);

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title:'Javascritp Gym',
                description: '',
                phone: '',
                latitude: -23.0883472,
                longitude: -52.4572067,
            });

         expect(response.statusCode).toEqual(201)   

    })



})
