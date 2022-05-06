import Fastify from 'fastify';
import fastifyPostgres from 'fastify-postgres';


declare module 'fastify' {
    interface FastifyRequest {
        someProp: string;
    }
}
interface IQueryString {
    username: string;
    password: string;
}

type addEntry = FastifyRequest<{
    Body: { test: 'boolean' };
}>

interface IHeaders {
    'h_Custom': string;
}

const PORT = 5000;

const server = Fastify({ logger: true });

server.register(fastifyPostgres, {
    connectionString: 'postgres://postgres@localhost/postgres'
});
server.decorateRequest('someProp', 'hello!')

server.get('/ping', async (req, reply) => {
    return { repl: 'pong' };
});

server.get < {
    Querystring: IQueryString,
    Headers: IHeaders
} > ('/auth', {
    preValidation: (req, reply, done) => {
        const { username, password } = req.query;
        done(username !== 'admin' ? new Error('Must be admin') : undefined);
    }
}, async (req, reply) => {
    const costumerHeader = req.headers['h-Custom'];
    // do smt with req data
    return 'Logged in!\n';
});

server.get('/blacklisted', async (req, reply) => {
    server.pg.query(
        'SELECT * FROM test',
        function onResult(err: Error, result: string) {
            reply.send(err || result);
        }
    )
});

server.post < {
    Querystring: addEntry,
    Headers: IHeaders
} > ('/add/:email', async (req, reply) => {
    return server.pg.transact(async client => {
        const { body } = req;
        const id = await client.query('INSERT INTO users(username) VALUES($1) RETURNING id', [body]);

        return id;
    })
})

server.listen({ port: PORT, host: '127.0.0.1' }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
