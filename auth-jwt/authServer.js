const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validRefTokens = [];

app.use(express.json());

app.post("/login", (req, res) => {
  const name = req.body.name;
  const user = { username: name };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
  const refreshToken = generateRefreshToken(user);

  res.json({ accessToken, refreshToken });
});

app.post("/token", (req, res) => {
  const refToken = req.body.token;
  if (!refToken) {
    res.sendStatus(401);
    return;
  }
  if (!validRefTokens.includes(refToken)) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    const newAccessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    res.json({ accessToken: newAccessToken });
  });
});

app.post("/logout", (req, res) => {
  const token = req.body.token;
  validRefTokens.filter((validToken) => validToken !== token);
  res.sendStatus(204);
});

function generateRefreshToken(user) {
  const refToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  validRefTokens.push(refToken);
  return refToken;
}

const port = 4000;
app.listen(port, () => {
  console.log(`Server is now running on Port ${port}`);
});
