const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("users/signup.liquid");
});

router.post("/signup", async (req, res) => {
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );

  User.create(req.body)
    .then((user) => {
      res.redirect("/users/login");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.get("/login", (req, res) => {
  res.render("users/login.liquid");
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(async (user) => {
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          req.session.username = username;
          req.session.loggedIn = true;

          res.redirect("/artists");
        } else {
          res.json({ error: "password doesn't match" });
        }
      } else {
        res.json({ error: "user doesn't exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.get("/logout", (req, res) => {
  // destroy session and redirect to main page
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

module.exports = router;
