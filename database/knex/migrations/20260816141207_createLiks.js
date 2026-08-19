
export const up = function(knex) {
  return knex.schema.createTable('links', table =>{
    table.increments('id').primary();
    table.text('url').notNullable();

    table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE');

    table.timestamp('created_at').defaultTo(knex.fn.now());
});
}


export const down = function(knex) {
  
};

