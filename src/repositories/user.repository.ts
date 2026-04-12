import { prisma} from "../database/prisma-client.js";
import type {User, CreateUserInput, userRepository} from '../interfaces/users.interface.js';

export class UserRepositoryPrisma implements userRepository {
    async create(user: CreateUserInput): Promise<User> {
        return await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                // roleId: user.roleId, // Se estiver usando papéis, adicione esta linha
            },
        }); 
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async update(email: string, user: CreateUserInput): Promise<User> {
        return await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                name: user.name,
                email: user.email,
                // roleId: user.roleId, // quando for implementado
            },
        });
    }

    async delete(email: string): Promise<boolean> {
        return await prisma.user.delete({
            where: {
                email: email,
            }
        })
        .then(() => true)
        .catch(() => false);
    }
}