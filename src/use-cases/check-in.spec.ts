import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory_check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

let repository: InMemoryCheckInsRepository;
let sut : CheckInUseCase;
let gymsRepository: InMemoryGymsRepository;


describe('Check In Use Case', () => {
    beforeEach(async() => {
        repository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(repository,gymsRepository);
        
        vi.useFakeTimers();

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Academia',
            description: '',
            phone: '',
            latitude: -23.0883472,
            longitude: -52.4572067,
        })
    })
    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in ', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude:-23.0883472,
            userLongitude:-52.4572067
        })      

        expect(checkIn.id).toEqual(expect.any(String));
        
    })

    
    it('should  not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude:-23.0883472,
            userLongitude:-52.4572067
        })      

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude:-23.0883472,
            userLongitude:-52.4572067
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);

        
        
    })
    it('should  not be able to check in twice in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude:-23.0883472,
            userLongitude:-52.4572067
        })      
        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
        const { checkIn: checkIn2 } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude:-23.0883472,
            userLongitude:-52.4572067
        })    

        expect(checkIn2.id).toEqual(expect.any(String));
        
    })

    it('should not be able to check in on distant gym ', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Academia',
            description: '',
            phone: '',
            latitude: new Decimal(-23.0883472),
            longitude: new Decimal(-52.4572067),
        })


        await expect(()=> sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude:-24.0883472,
            userLongitude:-52.4572067
        })).rejects.toBeInstanceOf(MaxDistanceError);      

        
        
    })

})