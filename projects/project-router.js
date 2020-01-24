const express = require("express");

const Projects = require("./project-model.js");

const router = express.Router();

// get projects
router.get("/projects/", (req, res) => {
  Projects.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get projects, sorry! " });
    });
});

// get project by id
router.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  Projects.getProjectById(id)
    .then(project => {
      project
        ? res.status(200).json(project)
        : res
            .status(404)
            .json({ message: "Project with specified ID does not exist. " });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error getting the project. " });
    });
});

// post a project
router.post("/projects/", (req, res) => {
  const projectData = req.body;

  Projects.addProject(projectData)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Unable to add project." });
    });
});

// get resources
router.get("/resources/", (req, res) => {
  Projects.getResources()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to get resources, sorry! " });
    });
});

// post resource
router.post("/resources/", (req, res) => {
  const resourceData = req.body;

  Projects.addResource(resourceData)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Unable to add resource." });
    });
});
// get tasks
router.get("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  Projects.getProjectById(id)
    .then(project => {
      project
        ? Projects.getTasks(id)
            .then(task => {
              res.status(200).json(task);
            })
            .catch(error => {
              console.log(error);
              res.status(500).json({ message: "Could not find task." });
            })
        : res
            .status(404)
            .json({ message: "Could not find project with that ID." });
    })
    .catch(error => {
      res.status(500).json({ message: "failed to get tasks." });
    });
});

router.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const taskData = req.body;
  Projects.getTasks(id)
    .then(task => {
      task
        ? Projects.addTask(id, taskData)
            .then(tasks => {
              console.log(tasks);
              res.status(200).json(tasks);
            })
            .catch(error => {
              console.log(error);
              res.status(500).json({ message: "Failed to get tasks, sorry! " });
            })
        : res
            .status(404)
            .json({ message: "Could not find Project with that ID. " });
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add task. " });
    });
});

module.exports = router;