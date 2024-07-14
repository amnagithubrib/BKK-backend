/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const { knexSnakeCaseMappers } = require("objection");

module.exports = {
    development: {
        client: "pg",
        connection: {
            // database: "objection",
            database: "ogp_database",
            host: "192.168.12.144",
            password: "BkkIntern@1234",
            // port: 5432,
            user: "postgres"
            // password: "123"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./seeds"
        },
        ...knexSnakeCaseMappers()
    }
};
