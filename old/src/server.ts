import Fastify from 'fastify';
import dbConnector from './mydbConnector';
import routes from './firstRoute';

const fastify = Fastify({
    logger: true
});

fastify.register(dbConnector);
fastify.register(routes);

fastify.listen({ port: 5000, host: '127.0.0.1' }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    else console.log(`Server is now running at ${address}`);
});