async function routes(fastify, options) {
    // Testing route
    fastify.get('/', async (request, reply) => {
        return { hello: 'world' };
    });
}

module.exports = routes;