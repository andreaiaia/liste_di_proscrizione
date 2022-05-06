export const routes = async (fastify, options) => {
    // Testing route
    fastify.get('/test', async (request, reply) => {
        return { hello: 'world' };
    });
};
