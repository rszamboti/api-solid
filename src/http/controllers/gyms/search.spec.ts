import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { title } from "process";


describe(' Search Gyms (e2e)', () => { // describe e2e
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search ', async () => {
        
        const { token } = await createAndAuthenticateUser(app);

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title:'Javascritp Gym',
                description: '',
                phone: '',
                latitude: -23.0883472,
                longitude: -52.4572067,
            });

            await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title:'Typescript Gym',
                description: '',
                phone: '',
                latitude: -23.0883472,
                longitude: -52.4572067,
            });

            const response = await request(app.server)
            .get('/gyms/search').query({
                query: 'Javascritp',
            })
            .set('Authorization', `Bearer ${token}`)
            .send();

         expect(response.statusCode).toEqual(200);
         expect(response.body.gyms).toHaveLength(1);
         expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title:'Javascritp Gym'
            })
         ])
    })



})
