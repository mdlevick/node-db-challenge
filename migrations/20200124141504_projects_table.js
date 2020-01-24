exports.up = function(knex) {
    return knex.schema
      .createTable("projects", tbl => {
        tbl.increments();
        tbl.string("name", 255).notNullable();
        tbl.string("description", 512);
        tbl
          .boolean("completed")
          .notNullable()
          .defaultTo(false);
      })
      .createTable("resources", tbl => {
        tbl.increments();
        tbl
          .string("name", 255)
          .notNullable()
          .unique();
        tbl.string("description", 512);
      })
      .createTable("tasks", tbl => {
        tbl.increments();
        tbl.string("description", 512).notNullable();
        tbl.string("notes", 512);
        tbl
          .boolean("completed")
          .notNullable()
          .defaultTo(false);
        tbl
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("projects")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      .createTable("project_resources", tbl => {
        tbl.primary(["project_id", "resource_id"]);
        tbl
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("projects")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
        tbl
          .integer("resource_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("resources")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      });
  };
  
  // like putting on / taking off socks and shoes!!!
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("project_resources")
      .dropTableIfExists("tasks")
      .dropTableIfExists("resources")
      .dropTableIfExists("projects");
  };