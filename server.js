// configuraçcoes de fastfy

import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})

// Rota

fastify.get('/', async function handler (request, reply) {
    return { hello: 'world'}
})

// Rodar o servidor !
try {
    await fastify.listen({ port : 3000})
} catch (erro) {
    fastify.log.error(erro)
    process.exit(1)
}
