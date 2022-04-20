async function routes(fastify, options) {
    fastify.get('/', async (req, reply) => {
        return { hello: 'world' };
    })
}

module.exports = routes;