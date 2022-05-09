import { FastifyPluginCallback } from "fastify";
import { addElement, find } from "./schemas.js";

export const routes: FastifyPluginCallback = async (fastify, options) => {
    // Testing route
    fastify.get('/test', async (req, reply) => {
        return { hello: 'friends' };
    });

    fastify.get('/blacklist', async (req, reply) => {
        const client = await fastify.pg.connect();

        try {
            const result = await client.query("SELECT * FROM blacklisted");
            reply.status(200).send(result);
            // return result;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    });

    fastify.get('/find', async (req: find, reply) => {
        const client = await fastify.pg.connect();

        const { first_name, last_name, email, phone } = req.body;

        try {

            const result = await client.query(
                "SELECT * FROM blacklisted"
            );
            reply.status(200).send(result);
            // return result;
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
    });

    fastify.post('/edit', { schema: { body: addElement } }, async (req, reply) => {
        return { hello: 'friends' };
        // const { first_name, last_name, email, phone, blacklisted, last_edit } = req.body;

        // const query = {
        //     text: `INSERT INTO blacklisted (
        //                 first_name, 
        //                 last_name, 
        //                 email, 
        //                 phone, 
        //                 blacklisted, 
        //                 last_edit
        //             )
        //             VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`,
        //     values: [first_name, last_name, email, phone, blacklisted, last_edit],
        // };

        // try {
        //     reply.code(201);
        //     return { created: true };
        // } catch (err) {
        //     throw new Error(err);
        // }
    });

    fastify.post('/add', async (req, reply) => {
        return { hello: 'friends' };
    });

    fastify.post('/del', async (req, reply) => {
        return { hello: 'friends' };
    });
}
