/* Create a new empty table */
/* you can launch this migration with the command */
/* db-migrate up init */

CREATE TABLE blacklist 
(
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_blocked BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_edit TIMESTAMP NOT NULL DEFAULT NOW(),
    last_edited_by VARCHAR(100) NOT NULL
)