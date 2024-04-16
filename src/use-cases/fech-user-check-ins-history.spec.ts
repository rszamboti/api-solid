import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory_check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FechUsercheckInsHistoryUseCase } from './fech-user-check-ins-history';

let repository: InMemoryCheckInsRepository;
let sut : FechUsercheckInsHistoryUseCase;



describe('Fetch User Check In Use Case', () => {
    beforeEach(async() => {
        repository = new InMemoryCheckInsRepository();
        sut = new FechUsercheckInsHistoryUseCase(repository);
    })
 

    it('should be able to fetch check-in history', async () => {
        await repository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await repository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            page:1
        })      

        expect(checkIn).toHaveLength(2);
        expect(checkIn).toEqual([
            expect.objectContaining({
                gym_id: 'gym-01',
            }),
            expect.objectContaining({
                gym_id: 'gym-02',
            })
        ])
    })

    it('should be able to fetch paginated check-in history', async () => {
       
       for (let i = 1; i <= 22; i++) {
            await repository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01',
            })
        }

        const { checkIn } = await sut.execute({
            userId: 'user-01',
            page:2
        })      

        expect(checkIn).toHaveLength(2);
        expect(checkIn).toEqual([
            expect.objectContaining({
                gym_id: 'gym-21',
            }),
            expect.objectContaining({
                gym_id: 'gym-22',
            })
        ])
    })
})