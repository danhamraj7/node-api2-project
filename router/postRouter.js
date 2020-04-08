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

//retrieve comment by id
router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  db.findPostComments(postId)
    .then((comments) => {
      if (comments) return res.status(200).json(comments);
      else {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." })
    );
});

// post a comment to an id
router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const newComment = req.body;
  const commentWithId = { ...newComment, post_id: id };
  db.insertComment(commentWithId)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        errorMessage: "Please provide text for the comment.",
      });
    });
});

//update a post
router.put("/:id", (req, res) => {
  const postId = req.params.id;
  const changed = req.body;
  if (!postId) {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
  if (!changed.title || !changed.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
  db.update(postId, changed)
    .then((result) => res.status(200).json(result))
    .catch((err) =>
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      })
    );
});

// destroy a post
router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  db.remove(postId)
    .then((num) => {
      if (num)
        return res.status(200).json({ messgae: `you deleted ${num} post` });
      else {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

module.exports = router;
