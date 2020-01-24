exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          description: "Complete Flexbox Froggy",
          notes: "Neat game to help you learn Flexbox",
          completed: false,
          project_id: 1
        },
        {
          description: "Layout CSS using flexbox",
          notes: "",
          completed: false,
          project_id: 1
        },
        {
          description: "Learn JS fundamentals",
          notes: "Helps a lot with React",
          completed: false,
          project_id: 2
        },
        {
          description: "Practice with components",
          notes: "React relies on components",
          completed: false,
          project_id: 2
        },
        {
          description: "Build out components",
          notes: "",
          completed: false,
          project_id: 2
        },
        {
          description: "Make sure your instructor is Luis",
          notes: "He is awesome at teaching Node",
          completed: false,
          project_id: 3
        },
        {
          description: "Become a Node legend",
          notes: "",
          completed: false,
          project_id: 3
        }
      ]);
    });
};