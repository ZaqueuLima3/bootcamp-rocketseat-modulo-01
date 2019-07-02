const express = require("express");

const server = express();

const users = ["Zauqueu", "Thaisa", "Mateus"];

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ message: users[id] });
});

server.listen(3000);
