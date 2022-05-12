export const routes = async (fastify, options) => {
    // Testing route
    fastify.get('/test', async (req, reply) => {
        reply.send({ hello: 'friends' });
    });
    fastify.get('/blacklist', async (req, reply) => {
        const client = await fastify.pg.connect();
        try {
            const { rows } = await client.query("SELECT * FROM blacklisted");
            reply.send(rows);
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
        const { email } = req.query;
        try {
            const { rows } = await client.query('SELECT * FROM blacklisted WHERE email=$1', [email]);
            if (rows === [])
                reply.send("No match found");
            reply.send(rows);
        }
        catch (err) {
            throw err;
        }
        finally {
            client.release();
        }
    });
    fastify.post('/blacklist', async (req, reply) => {
        const { first_name, last_name, email, phone, is_blocked, last_edited_by } = req.body;
        try {
            return fastify.pg.transact(async (client) => {
                const { rows } = await client.query(`INSERT INTO blacklisted 
                    (
                        first_name, 
                        last_name, 
                        email, 
                        phone, 
                        is_blocked, 
                        last_edited_by
                    )
                    VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`, [first_name, last_name, email, phone, is_blocked, last_edited_by]);
                reply.send(rows);
            });
        }
        catch (err) {
            throw err;
        }
    });
    fastify.patch('/', async (req, reply) => {
        const { is_blocked, last_edited_by } = req.body;
        const { id } = req.query;
        try {
            return fastify.pg.transact(async (client) => {
                const { rows } = await client.query(`UPDATE blacklisted SET
                        is_blocked=$5, 
                        last_edited_by=$6
                    WHERE id=$7 RETURNING *`, [is_blocked, last_edited_by, id]);
                reply.send(rows);
            });
        }
        catch (err) {
            throw err;
        }
    });
    fastify.delete('/', async (req, reply) => {
        const { id } = req.query;
        try {
            return fastify.pg.transact(async (client) => {
                const { rows } = await client.query(`DELETE FROM blacklisted
                    WHERE id=$1 RETURNING *`, [id]);
                reply.send(rows);
            });
        }
        catch (err) {
            throw err;
        }
    });
};
