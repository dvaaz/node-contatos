import { prisma} from "../database/prisma-client.js";
import type {Role, CreateRoleInput, roleRepository} from '../interfaces/roles.interface.js';

export class RoleRepositoryPrisma implements roleRepository {
    async create(role: CreateRoleInput): Promise<Role> {
        return await prisma.role.create({
            data: {
                name: role.name,
            },
        });
    }

    async findByName(name: string): Promise<Role | null> {
        return await prisma.role.findUnique({
            where: {
                name: name,
            },
        });
    }

    async delete(name: string): Promise<boolean> {
        return await prisma.role.delete({
            where: {
                name: name,
            }
        })
        .then(() => true)
        .catch(() => false);
    }
}