// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */


import path from "node:path";
import { fileURLToPath } from "node:url";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,'database', 'database.sqlite')
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    },
    migrations: {
      directory: path.resolve(__dirname,'database', 'knex', 'migrations')
    },
    useNullAsDefault: true
  },


};
