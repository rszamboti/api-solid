import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

import { SearchGymsUseCase } from './search-gyms';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let repository: InMemoryGymsRepository;
let sut : FetchNearbyGymsUseCase;



describe('Fech Nearby Gym Use Case', () => {
    beforeEach(async() => {
        repository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(repository);
    })
 

    it('should be able to fetch nearby gyms', async () => {
        await repository.create({
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: -23.0883472,
            longitude: -52.4572067,
        })

        await repository.create({
            title: 'JavaScript Gym2',
            description: '',
            phone: '',
            latitude: -23.0883472,
            longitude: -52.4572067,
        })

        const { gyms } = await sut.execute({
            userLatitude: -23.0883472,
            userLongitude: -52.4572067
        })      

        expect(gyms).toHaveLength(2);
    })


})