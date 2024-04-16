import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory_check-ins-repository';
import { FechUsercheckInsHistoryUseCase } from './fech-user-check-ins-history';
import { GetUserMetricsUseCase } from './get-user-metrics';

let repository: InMemoryCheckInsRepository;
let sut : GetUserMetricsUseCase;



describe('Get User MEtrics', () => {
    beforeEach(async() => {
        repository = new InMemoryCheckInsRepository();
        sut = new GetUserMetricsUseCase(repository);
    })
 

    it('should be able to get check-in count from metrics', async () => {
        await repository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await repository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkInCount } = await sut.execute({
            userId: 'user-01',
        })      

        expect(checkInCount).toEqual(2);
        
    })

    it('should be able to fetch paginated check-in history', async () => {
       
       for (let i = 1; i <= 22; i++) {
            await repository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01',
            })
        }

        const { checkInCount } = await sut.execute({
            userId: 'user-01',
        })      

        expect(checkInCount).toEqual(22);
    })
})