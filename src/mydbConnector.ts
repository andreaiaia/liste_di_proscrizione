import { FastifyPluginCallback } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fastifyMongodb from 'fastify-mongodb';

const dbConnector: FastifyPluginCallback = async (fastify, options) => {
    fastify.register(fastifyMongodb, {
        url: 'mongodb://localhost:27017/test_database'
    })
}

export default fastifyPlugin(dbConnector);