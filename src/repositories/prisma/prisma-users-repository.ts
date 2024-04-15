import { prisma } from "@/lib/prisma";
import { Prisma, User} from "@prisma/client";
import { UserRespository } from "../users-repository";


export class PrismaUsersRepository implements UserRespository {
    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }
}