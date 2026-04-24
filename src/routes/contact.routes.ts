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

            if (!data) {
                return reply.status(400).send({ erro: 'Erro ao criar contato' });
            }
            return reply.status(201).send(data);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

    /**
     * Get: rota para listar todos os contatos d eum usuario
     */
    fastify.get<{Params: {email: string}}>('/user-contacts/:email', async (request, reply) => {
        const userEmail = request.params.email as string;
        try {
            const data = await contactUseCase.showAllContactsByUserEmail(userEmail);
            return reply.status(200).send(data);
        } catch (error) {
            return reply.status(500).send({ erro: 'Erro: ' + error });
        }
    });

    /**
     * Update: update de contato existente
     */
    fastify.put<{ Params: { id: string }, Body: UpdateContactInput }>('/update/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const data = await contactUseCase.updateContact(id, request.body);
            if (!data) {
                return reply.status(404).send({ erro: 'Erro ao atualizar contato' });
            }
            return reply.status(200).send(data);
        } catch (error) {
            return reply.status(500).send({ erro: 'Erro : ' + error });
        }
    });

    /**
     * Delete: delete de contato existente
     */
    fastify.delete<{ Params: { id: string } }>("/delete/:id", async (request, reply) => {
        const { id } = request.params;
        try {
            const data = await contactUseCase.deleteContact(id);
            if (!data) {
                return reply.status(404).send({ erro: 'Erro ao deletar contato' });
            }
            return reply.status(200).send({ message: 'Contato deletado com sucesso' });
        } catch (error) {
            return reply.status(500).send({ erro: 'Erro: ' + error });
        }
    })

}
