import Fastify from "fastify";

const server = Fastify({ logger: true });
const PORT = 4896;

server.get('/ping', async (req, reply) => {
    reply.type('application/json').code(200);
    return { test: 'pong\n' };
})

server.listen({ port: PORT, host: '127.0.0.1' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
})
