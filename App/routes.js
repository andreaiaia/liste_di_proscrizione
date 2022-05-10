export const routes = async (fastify, options) => {
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
        }
        catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    });
    fastify.get('/find', async (req, reply) => {
        const client = await fastify.pg.connect();
        const { first_name } = req.query;
        try {
            const { rows } = await client.query('SELECT * FROM blacklisted WHERE first_name=$1', [first_name]);
            if (rows === [])
                return "No match found";
            return rows;
        }
        catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    });
    fastify.post('/add', async (req, reply) => {
        // const client = await fastify.pg.connect();
        const { first_name, last_name, email, phone, is_blocked, last_editor } = req.body;
        try {
            return fastify.pg.transact(async (client) => {
                const { rows } = await client.query(`INSERT INTO blacklisted (
                                first_name, 
                                last_name, 
                                email, 
                                phone, 
                                is_blocked, 
                                last_editor
                            )
                    VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`, [first_name, last_name, email, phone, is_blocked, last_editor]);
                return rows;
            });
        }
        catch (err) {
            throw err;
        }
        // } finally {
        //     client.release();
        // }
    });
    fastify.patch('/edit', async (req, reply) => {
        const { first_name, last_name, email, phone, is_blocked, last_editor } = req.body;
        try {
            return fastify.pg.transact(async (client) => {
                const { rows } = await client.query(`INSERT INTO blacklisted (
                                first_name, 
                                last_name, 
                                email, 
                                phone, 
                                is_blocked, 
                                last_editor
                            )
                    VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`, [first_name, last_name, email, phone, is_blocked, last_editor]);
                return rows;
            });
        }
        catch (err) {
            throw err;
        }
    });
    fastify.delete('/del', async (req, reply) => {
        return { hello: 'friends' };
    });
};
