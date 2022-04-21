import { FastifyPluginCallback } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

const routes: FastifyPluginCallback = async (fastify, options) => {
    const collection = fastify.mongo.db?.collection('test-collection');

    fastify.get('/', async (req, reply) => {
        return { hello: 'world' };
    });

    fastify.get('/animals', async (req, reply) => {
        const result = await collection?.find().toArray();
        if (result === undefined) {
            throw new Error("Invalid Value");
        }
        return result;
    });

    const animalBodyJsonSchema = {
        type: 'object',
        required: ['animal'],
        properties: {
            animal: { type: 'string' }
        }
    } as const;

    const schema = {
        body: animalBodyJsonSchema
    };

    fastify.post<{ Body: FromSchema<typeof animalBodyJsonSchema> }>(
        '/animals', { schema },
        async (req, reply) => {
            // We can use the 'request.body' object to get the data sent by the client
            const result = await collection?.insertOne({ animal: req.body.animal });
            return result;
        }
    );
}

export default routes;