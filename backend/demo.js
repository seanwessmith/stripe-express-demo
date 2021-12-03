const express = require("express");
const bodyParser = require("body-parser");
var pgp = require("pg-promise")(/* options */);
var db = pgp("postgres://username:password@host:port/database");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Endpoint Active");
});

app.get("/user", async function (req, res) {
  const user = await db.none("SELECT * FROM users WHERE id = $1", [
    req.body.id,
  ]);
  res.send(user);
});
app.put("/user", async function (req, res) {
  await db.none("UPDATE users SET name=$1, email=$2 WHERE id=$3", [
    req.body.name,
    req.body.email,
    req.body.id,
  ]);
  res.send("Got a PUT request at /user");
});

app.post("/login", async function (req, res) {
  let status = 200;
  // await db.none("INSERT INTO users(id, name, email) VALUES($1, $2, $3)", [
  //   req.body.id,
  //   req.body.name,
  //   req.body.email,
  // ]);
  console.log("req.body: ", req.body);
  res.status(status).send(req.body);
});
app.post("/user", async function (req, res) {
  let status = 200;
  // await db.none("INSERT INTO users(id, name, email) VALUES($1, $2, $3)", [
  //   req.body.id,
  //   req.body.name,
  //   req.body.email,
  // ]);
  const body = JSON.parse(JSON.stringify(req.body));
  console.log("req.body.name: ", body);
  res.status(status).send(body.name);
});

app.delete("/user", async function (req, res) {
  await db.none("DELETE FROM users WHERE id = $1", [1]);
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
