////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////

const express = require("express");
const Artists = require("../models/artist.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();


////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/users/login");
  }
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route
router.get("/", (req, res) => {
  // find all the Artists
  Artists.find({ username: req.session.username })
    // render a template after they are found
    .then((artists) => {
      console.log(artists);
      res.render("artists/index.liquid", { artists });
    })
    // send error as json if they aren't
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// new route
router.get("/new", (req, res) => {
  res.render("artists/new.liquid");
});

// create route
router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  
  // add username to req.body to track related user
  req.body.username = req.session.username;

  // create the new fruit
  Artists.create(req.body)
    .then((artists) => {
      // redirect user to index page if successfully created item
      res.redirect("/Artists");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // find the particular fruit from the database
  Artists.findById(id)
    .then((artist) => {
      // render the template with the data from the database
      res.render("artists/show.liquid", { artist });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
 
  // update the fruit
  Artists.findByIdAndUpdate(id, req.body, { new: true })
    .then((fruit) => {
      // redirect to main page after updating
      res.redirect("/Artists");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Artists.findById(id)
    .then((fruit) => {
      // render edit page and send fruit data
      res.render("artists/edit.liquid", { fruit });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Artists.findByIdAndRemove(id)
    .then((fruit) => {
      // redirect to main page after deleting
      res.redirect("/Artists");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
