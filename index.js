const express = require("express");

const server = express();

server.use(express.json());

const users = ["Zauqueu", "Thaisa", "Mateus"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método ${req.method}, URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserNameExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "user name is required" });
  }

  next();
}

function checkUserExist(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "user does not exists" });
  }

  req.user = user;

  next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserExist, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserNameExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserNameExists, checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users[index]);
});

server.delete("/users/:index", checkUserExist, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
