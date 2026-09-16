 import OpenDatabase from "../index.js";
import CreateMigrationsTableUsers from "./createTableUsers.js";
 

 async function runMigrations() { 

    const schema =[
        CreateMigrationsTableUsers
    ].join('');

    OpenDatabase()
    .then(async (db) => {
        await db.exec(schema);
       
    })
    .catch((err) => {
        console.error("Error executing migrations:", err);
    });
  }
  export default runMigrations;