const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get actions" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(action => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ message: "action does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get action" });
    });
});

router.post("/", (req, res) => {
  const action = req.body;
  if ( action.project_id && action.notes) {
    db.insert(action)
      .then(
        db.get().then(actionInfo => {
          res.status(200).json(actionInfo);
        })
      )
      .catch(err => {
        res.status(500).json({ message: "Failed to add action." });
      });
  } else {
    res.status(400).json({
      message:
        "action info missing"
    });
  }
});

router.put("/:id", (req, res) => {
  const action = req.body;
  const { id } = req.params;

  if(action.project_id && action.description.length < 128) {
    db.update(id, action)
    .then(actionInfo => {
        if(actionInfo) {
            db.get(actionInfo.id)
            .then(updatedAction => {
                res.json(updatedAction)
            })
        } else {
            res.status(404).json({message: 'action id does is missing'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error'})
    })
} else {
    res.status(500).json({message: 'missing info'})
}
})

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
      res.status(500).json({ message: "failed to delete action" });
    });
});

module.exports = router;
