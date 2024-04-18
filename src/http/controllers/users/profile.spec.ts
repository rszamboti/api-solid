import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe('Profile (e2e)', () => { // describe e2e
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'pCZiQ@example.com',
            password: '123456',
        })
        const response = await request(app.server).post('/sessions').send({
            email: 'pCZiQ@example.com',
            password: '123456',
        })
        

        const { token } = response.body;

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send();

         expect(profileResponse.statusCode).toEqual(200)   
         expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: 'pCZiQ@example.com',
            }) 
            
         )

    })



})
