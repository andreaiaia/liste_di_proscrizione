import { FastifyPluginCallback } from 'fastify';

const routes: FastifyPluginCallback = async (fastify, options, done) => {
    fastify.get('/', async (req, reply) => {
        return { hello: 'world' };
    })
}

export default routes;