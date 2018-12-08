const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get projects" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: "project does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get project" });
    });
});

router.post("/", (req, res) => {
  const project = req.body;
  if (project.name && project.description) {
    db.insert(project)
      .then(idInfo => {
        db.get(idInfo.id).then(project => {
          res.status(201).json(project);
        });
      })
      .catch(err => {
        res.status(500).json({ message: "failed to create post" });
      });
  } else {
    res.status(400).json({ message: "missing info, try again" });
  }
});

router.put("/:id", (req, res) => {
  const project = req.body;
  const { id } = req.params;

  if (project.name && project.description) {
    db.update(id, project)
      .then(count => {
        if (count) {
          db.get(id).then(project => {
            res.json(project);
          });
        } else {
          res.status(404).json({ message: "invalid id" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "failed" });
      });
  } else {
    res.status(400).json({ message: "missing info!" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      if (count) {
        // we would like to send back the user
        res.json({ message: "successfully deleted" });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to delete project" });
    });
});


module.exports = router;
