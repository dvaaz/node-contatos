// configuraçcoes de fastfy

import Fastify from 'fastify' 
import type { FastifyInstance } from 'fastify'


const fastify = Fastify({
    logger: true // Traz algumas informações de log do sistema. Utilizar na fase de desenvolvimento para depuração. Como padrão é false
})

// Rota

fastify.get('/', async function handler (request, reply) {
    return { hello: 'world'}
})

// Rodar o servidor !
try {
    await fastify.listen({ port : 3100})
} catch (erro) {
    fastify.log.error(erro)
    process.exit(1)
}
