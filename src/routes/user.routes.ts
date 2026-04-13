import type { FastifyInstance } from 'fastify';
import { UserUseCase } from '../usecases/user.usecase.js';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';
import type { UpdateUserInput, CreateUserInput } from '../interfaces/users.interface.js';

export async function userRoutes(fastify: FastifyInstance) {
    const userRepository = new UserRepositoryPrisma();
    const userUseCase = new UserUseCase(userRepository);

// Rota teste
    fastify.get('/', async (request, reply) => {
        const agora = new Date();
        return reply.send(`Olá usuário! A hora atual é: ${agora}`);
    });


    fastify.post<{Body: CreateUserInput}>('/', async (request, reply) => {
        try {
            const data = await userUseCase.createUser(request.body);
            return reply.status(201).send(data);
        } catch (error) {
            return reply.status(400).send({ erro: (error as Error).message });
        }
    });

    fastify.get('/:email', async (request, reply) => {
        try {
            const { email } = request.params as { email: string };
            const data = await userUseCase.getUserByEmail(email);
            return reply.send(data);
        }
        catch (error) {
            return reply.status(404).send({ erro: (error as Error).message });
        }
    });

    fastify.put<{Params: {email: string}, Body: UpdateUserInput}>('/:email', async (request, reply) => {
        try {
            const { email } = request.params;
            const data = await userUseCase.updateUser(email, request.body);
            return reply.send(data);
        }
        catch (error) {
            return reply.status(404).send({ erro: (error as Error).message });
        }
    });

    fastify.delete('/:email', async (request, reply) => {
        try {
            const { email } = request.params as { email: string };
            const deleted = await userUseCase.deleteUser(email);
            if (!deleted) {
                return reply.status(404).send({ erro: 'Usuario nao encontrado para deletar' });
            }
            return reply.send({ message: 'Usuario deletado com sucesso' });
        }
        catch (error) {
            return reply.status(404).send({ erro: (error as Error).message });
        }
    });
}