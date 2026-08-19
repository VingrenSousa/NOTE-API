
export const up = function(knex) {
  return knex.schema.createTable('tegs', table =>{
    table.increments('id').primary();
    table.text('name').notNullable();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('nota_id').references('id').inTable('notes').onDelete('CASCADE');

   
    
})
};


export const down = function(knex) {
  
};
