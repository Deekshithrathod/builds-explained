const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validRefTokens = [];

const posts = [
  { name: "kylie", title: "some-title-1" },
  { name: "kendal", title: "some-title-2" },
];

app.use(express.json());

app.post("/posts", (req, res) => {
  const token = req.body.token;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    return res.json(posts.filter((post) => post.name === user.username));
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running on Port ${port}`);
});
