
exports.up = function(knex, Promise) {
    return knex.schema.createTable("actions", function (tbl) {
        tbl.increments();

        tbl
            .string("description")
            .notNullable()
        
        tbl
            .string("notes")
    
        tbl
            .integer("project_id")
            .unsigned()
            .references('id')
            
        
        tbl
        .boolean("completed")
        
        
        
        tbl.timestamps(true, true);
        
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
};
