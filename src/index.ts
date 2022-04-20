import fastify from "fastify";

const server = fastify();
const PORT = 4896;

server.get('/ping', async (request, reply) => {
    reply.send({ test: 'pong\n' });
})

server.listen(PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1)
    }
    console.log(`Server listening at ${address}`);
})