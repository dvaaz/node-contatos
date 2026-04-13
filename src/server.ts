import 'dotenv/config';
import fastify from 'fastify';
import type {FastifyInstance} from 'fastify';
import { userRoutes } from './routes/user.routes.js';
import { contactRoutes } from './routes/contact.routes.js'


const app: FastifyInstance = fastify({
    logger:true // identifica oslogs para auditoria, desligar antes da entrega ao cliente
})

app.register(userRoutes, {prefix: '/users'});

app.register(contactRoutes, {prefix:'/contacts'});

// Iniciar o servidor e escutar a porta

app.listen({ port: Number(process.env.PORT) || 3000 }, (error, address) => {
    if (error) {
        app.log.error(error);
        process.exit(1);
    }

    app.log.info(`Server listening at ${address}`);
});