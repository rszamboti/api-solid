import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance){

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

    return {
        token
    }
}