import type { FastifyInstance } from 'fastify';
import { ContactUseCase } from '../usecases/contact.usecase.js';
import { ContactRepositoryPrisma } from '../repositories/contact.repository.js';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';
import type { CreateContactInput, UpdateContactInput } from '../interfaces/contacts.interface.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export async function contactRoutes(fastify: FastifyInstance) {
    const contactRepository = new ContactRepositoryPrisma();
    const userRepository = new UserRepositoryPrisma();
    const contactUseCase = new ContactUseCase(contactRepository, userRepository)

    fastify.addHook('preHandler', authMiddleware);

    // Métodos
    /**
     * Criar: rota para  acriacao de novo contato
     */
    fastify.post<{ Body: CreateContactInput }>('/', async (request, reply) => {
        const { nome, email, telefone } = request.body;
        const userEmail = request.headers['email'] as string;
        try {
            const data = await contactUseCase.createContact({
                nome,
                email,
                telefone,
                userEmail
            });
    
            return reply.status(201).send(data);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

    /**
     * Update: update de contato existente
     */
    

}
