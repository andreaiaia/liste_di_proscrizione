import { FastifyPluginCallback } from "fastify";
import { addElement } from "./schemas.js";
import pkg from "pg";

const { Client } = pkg;

const client = new Client({
    user: `${process.env.POSTGRES_USER}`,
    database: `${process.env.POSTGRES_DB}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    port: parseInt(process.env.POSTGRES_PORT || '5432')
});

client.connect();

export const routes: FastifyPluginCallback = async (fastify, options) => {
    // Testing route
    fastify.get('/test', async (req, reply) => {
        return { hello: 'friends' };
    });

    fastify.get('/blacklist', async (req, reply) => {
        try {
            const result = client.query("SELECT * FROM blacklisted");
            reply.status(200).send(result);
        } catch (err) {
            throw err;
        }
    });

    fastify.get('/id', async (req, reply) => {
        return { hello: 'friends' };
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
