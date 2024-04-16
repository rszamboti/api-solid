import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

import { SearchGymsUseCase } from './search-gyms';
import { title } from 'process';

let repository: InMemoryGymsRepository;
let sut : SearchGymsUseCase;



describe('Search Gym Use Case', () => {
    beforeEach(async() => {
        repository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(repository);
    })
 

    it('should be able to search for gyms', async () => {
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
            query: 'JavaScript',
            page:1
        })      

        expect(gyms).toHaveLength(2);
    })

    it('should be able to fetch paginated check-in history', async () => {
       
       for (let i = 1; i <= 22; i++) {
            await repository.create({
            title: `JavaScript Gym ${i}`,
            description: '',
            phone: '',
            latitude: -23.0883472,
            longitude: -52.4572067,
            })
        }

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page:2
        })      

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym 21',
            }),
            expect.objectContaining({
                title: 'JavaScript Gym 22',
            })
        ])
    })
})