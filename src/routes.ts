import { FastifyPluginCallback } from "fastify";
import { FastifyInstance } from "fastify";

export const routes: FastifyPluginCallback = async (fastify, options) => {
    // Testing route
    fastify.get('/test', async (request, reply) => {
        return { hello: 'world' };
    });


}