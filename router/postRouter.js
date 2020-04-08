const express = require("express");

const db = require("../data/db");

const router = express.Router();

//get posts
router.get("/", (req, res) => {
  db.find()
    .then((posts) => res.status(200).json(posts))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

//get post by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then((post) => {
      if (post) return res.status(200).json(post);
      else
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

//post to db
router.post("/", (req, res) => {
  const newPost = req.body;
  console.log(newPost);
  db.insert(newPost)
    .then((result) => res.status(201).json(result))
    .catch((err) =>
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post.",
      })
    );
});

module.exports = router;
