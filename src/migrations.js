import * as dbMigrate from 'db-migrate';

export const applyMigration = () => {
    return new Promise((resolve, reject) => {
        const instance = dbMigrate.getInstance(true);
        instance.silence(true);

        instance.up((err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });
};
