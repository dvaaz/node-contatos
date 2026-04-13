import type { FastifyReply, FastifyRequest} from 'fastify';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';

/**
 * Este Middleware verifica se o e-mail fornecido no cabeçalho existe e pertence a um usuario válido no banco de dados
 */

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    try {
    // dado principal do usuario.
    const email = request.headers['email'] as string;
    // Verifica se email FOI  fornecido no cabeçalho
    if (!email){
        return reply.status(401).send({message: 'Email header is empty!'});
    } 
    // cria uma instancia do userrepository para acessar ao banco de dados
    const userRepository = new UserRepositoryPrisma();
    const user = await userRepository.findByEmail(email);
    /// Verifica se o usuário foi encontrado no banco de dados
    if (!user) {
        return reply.status(401).send({ message: 'Usuário não encontrado'})
    }
    // Anexa usuário a request
    
    } catch (error) {
        return reply.status(500).send({message: 'Server error :', error})
    }
}