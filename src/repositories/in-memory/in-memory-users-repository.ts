import { User, Prisma } from "@prisma/client";
import { UserRespository } from "../users-repository";

export class InMemoryUsersRepository implements UserRespository{
    public items: User[] = [];
    async findById(id: string): Promise<User | null> {
        const user = this.items.find(item => item.id === id)
        if(!user) {
            return null
        }
        return user
    }
    
   
    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)
        if(!user) {
            return null
        }
        return user
    }
    
    async create(data: Prisma.UserCreateInput): Promise<User> {

        const user = {
            id: '1',
            name: data.name,
            email: data.email,
            created_at: new Date(),
            password_hash: data.password_hash,
        }

        this.items.push(user);
    
        return user;
    }
    
        
}