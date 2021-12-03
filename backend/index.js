const express = require("express");
const bodyParser = require("body-parser");
const env = require("./env");
const Stripe = require("stripe");
const stripe = Stripe(env.stripe_key);
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/stripe/accounts", async (req, res) => {
  let status = 200;
  try {
    const account = await stripe.accounts.create({
      type: "express",
      country: req.body.country,
      email: req.body.email,
    });
    res.status(status).send(account);
  } catch (err) {
    status = 500;
    res.status(status).send(err);
  }
});

app.get("/stripe/accounts", async (req, res) => {
  const account = await stripe.accounts.retrieve(req.params.id);
  res.status(200).send(account);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
