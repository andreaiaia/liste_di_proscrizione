import Fastify from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import { routes } from './routes.js';

const fastify = Fastify({ logger: true });

// const db = fastifyPostgres({
//     connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_SERVICE}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
// });

fastify.register(fastifyPostgres, {
    connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_SERVICE}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
});

fastify.register(routes);

// Run the server
const start = async () => {
    try {
        fastify.listen(3000, '0.0.0.0', (_, address) => {
            console.log(`Listening at port: ${address}`);
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();