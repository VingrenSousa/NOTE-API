
export const up = function(knex) {
  return knex.schema.createTable('notes', table =>{
    table.increments('id').primary();
    table.text('title');
    table.text('description');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

   
  })
};


export const down = function(knex) {
    return knex.schema.dropTable('notes', table =>{
    
   
  })
  
};
