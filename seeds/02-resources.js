exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("resources").insert([
        { name: "React", description: "Helpful Frontend JS Library" },
        { name: "Node.js", description: "JS on the backend, thanks Google!" },
        { name: "CSS", description: "Cascading Style Sheets!" }
      ]);
    });
};