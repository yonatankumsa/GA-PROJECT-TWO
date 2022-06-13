const express = require("express");
const Artists = require("../models/artist.js");
const router = express.Router();

router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/users/login");
  }
});

router.get("/", (req, res) => {
  Artists.find({ username: req.session.username })

    .then((artists) => {
      console.log(artists);
      res.render("artists/index.liquid", { artists });
    })

    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// new route
router.get("/new", (req, res) => {
  res.render("artists/new.liquid");
});

router.post("/", (req, res) => {
  req.body.username = req.session.username;

  Artists.create(req.body)
    .then((artists) => {
      res.redirect("/Artists");
    })

    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Artists.findById(id)
    .then((artist) => {
      res.render("artists/show.liquid", { artist });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;

  Artists.findByIdAndUpdate(id, req.body, { new: true })
    .then((fruit) => {
      res.redirect("/Artists");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;

  Artists.findById(id)
    .then((fruit) => {
      res.render("artists/edit.liquid", { fruit });
    })

    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Artists.findByIdAndRemove(id)
    .then((fruit) => {
      res.redirect("/Artists");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
module.exports = router;
