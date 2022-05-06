import { FastifyPluginCallback } from "fastify";
import { FastifyInstance } from "fastify";

export const routes: FastifyPluginCallback = async (fastify, options) => {
    // Testing route
    fastify.get('/test', async (request, reply) => {
        return { hello: 'friends' };
    });

    fastify.get('/blacklist', async (request, reply) => {
        return { hello: 'friends' };
    });

    fastify.get('/id', async (request, reply) => {
        return { hello: 'friends' };
    });

    fastify.post('/edit', async (request, reply) => {
        return { hello: 'friends' };
    });

    fastify.post('/add', async (request, reply) => {
        return { hello: 'friends' };
    });

    fastify.post('/del', async (request, reply) => {
        return { hello: 'friends' };
    });
}