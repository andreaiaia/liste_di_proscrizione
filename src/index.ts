import Fastify from 'fastify';
import routes from './firstRoute';

const PORT = 5000;

const fastify = Fastify({ logger: true });

fastify.register(routes);

fastify.get('/', async (req, reply) => {
    return { hello: 'world' };
})

const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: '127.0.0.1' })
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();