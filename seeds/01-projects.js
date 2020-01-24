exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "Flexbox Project",
          description: "Use Flexbox",
          completed: false
        },
        {
          name: "React Project",
          description: "Use React to create Facebook 2",
          completed: false
        },
        {
          name: "Node Project",
          description: "Create seeds in Node",
          completed: false
        }
      ]);
    });
};