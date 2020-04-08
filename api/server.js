const express = require("express");

//const postsRouter = require("../router/postRouter.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
    <p>BY: Dan Hamraj</p>
  `);

  // this is the request to  route that begins with api/posts
  //server.use("/api/posts", postsRouter);
});

module.exports = server;
