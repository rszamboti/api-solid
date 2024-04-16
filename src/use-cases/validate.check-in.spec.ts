import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory_check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { ValidateCheckinUseCase } from './validate.check-in';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let repository: InMemoryCheckInsRepository;
let sut : ValidateCheckinUseCase;


describe('Validate Check In Use Case', () => {
    beforeEach(async() => {
        repository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckinUseCase(repository);
        vi.useFakeTimers();
    })
    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in ', async () => {
        const CreateCheckIn = await repository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })
        

        const { checkIn } = await sut.execute({
            checkInId: CreateCheckIn.id,
        })      

        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(repository.items[0].validated_at).toEqual(expect.any(Date));
        
    })

    it('should not be able to validate an inexistent check-in ', async () => {
        await expect(() => sut.execute({
            checkInId: 'inexistent-check-in-id',
        })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    })
        
    it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2024, 0, 1, 13, 40));
        const CreateCheckIn = await repository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        vi.advanceTimersByTime(21 * 60 * 1000); // 21 minutes

        await expect(() => sut.execute({
            checkInId: CreateCheckIn.id,
        })
        ).rejects.toBeInstanceOf(Error);
    })




})