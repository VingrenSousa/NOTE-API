

import knex from "knex";
import path from "node:path";
import { fileURLToPath } from "node:url";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectKnex = knex({
  client: "sqlite3",
  connection: {
    filename:  path.resolve(__dirname,'..','..','..',"database", 'database.sqlite')
  }, 
  pool: {
      afterCreate: (conn:any, cb:any) => conn.run('PRAGMA foreign_keys = ON', cb)
    },
  migrations: {
        directory: path.resolve(__dirname,'..','..','..','database', 'knex', 'migrations')
      },
  useNullAsDefault: true
});

export default connectKnex;