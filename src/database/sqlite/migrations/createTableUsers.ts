const CreateMigrationsTableUsers:string = `
    CREATE TABLE if not exists users (
        id INTEGER primary key AUTOINCREMENT, 
        name varchar,
        email varchar unique,
        password varchar,
        avatar varchar null,
        create_at timestamp default current_timestamp,
        update_at timestamp default current_timestamp

)`

export default CreateMigrationsTableUsers;

