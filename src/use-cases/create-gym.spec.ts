import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it, test } from 'vitest';
import { CreateGymUseCase } from './create-gym';


let Repository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        Repository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(Repository);

    })

    it('should be able to create gym', async () => {

        const { gym } = await sut.execute({
            title: 'Academia',
            description: '',
            phone: '',
            latitude: -23.0883472,
            longitude: -52.4572067,
        })

        expect(gym.id).toEqual(expect.any(String));

    })

})