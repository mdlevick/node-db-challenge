const db = require("../db-config.js");

module.exports = {
  getProjects,
  getResources,
  getTasks,
  getProjectById,
  addProject,
  addResource,
  addTask
};

function getProjects() {
  return db("projects").then(projects => {
    return projects.map(project => {
      return { ...project, completed: Boolean(project.completed) };
    });
  });
}

function getProjectById(id) {
  return db("projects")
    .where({ id })
    .first()
    .then(project => {
      return { ...project, completed: Boolean(project.completed) };
    });
}

function addProject(project) {
  return db("projects")
    .insert(project)
    .then(ids => ({ id: ids[0] }));
}

function getResources() {
  return db("resources");
}

function addResource(resource) {
  return db("resources")
    .insert(resource)
    .then(ids => ({ id: ids[0] }));
}

function getTasks(id) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .select(
      "p.name",
      "p.description as project_description",
      "t.description",
      "t.notes",
      "t.completed"
    )
    .where({ project_id: id })
    .then(tasks => {
      return tasks.map(task => {
        return { ...task, completed: Boolean(task.completed) };
      });
    });
}

function addTask(id, task) {
  return db("tasks")
    .insert({ ...task, project_id: id })
    .then(ids => ({ id: ids[0] }));
}