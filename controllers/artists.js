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
    
 
fetch('https://api.napster.com/v2.2/playlists/top?apikey=ZTk4OGExZDgtMGRlNS00OTgzLWExMmItNjJjY2E2YzNkNTg1&limit=40')
.then(response => response.json())
.then(response => {console.log(response)




router.get("/", (req, res) => {
  Artists.find({ username: req.session.username })

    .then((artists) => {
      console.log(artists);
      res.render("artists/index.liquid", { artists ,
     id:response.playlists
      
      });
    })

    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});




// new route
router.get("/new", (req, res) => {
  Artists.find({ username: req.session.username })

    .then((artists) => {
      console.log(artists);
  res.render("artists/new.liquid",{ artists });
})
});

// router.post("/", (req, res) => {
//   req.body.username = req.session.username;

//   Artists.create(req.body)
//     .then((artists) => {
//       res.redirect("/Artists");
//     })

//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });

router.get("/playlists",(req,res)=>{
  res.render("artists/playlists.liquid",)
})


router.post("/playlists",(req,res)=>{
  req.body.username = req.session.username;

  Artists.create(req.body)
    .then((artists) => {
      res.redirect("/Artists/playlists");
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });

})

router.get("/:id", (req, res) => {
  const id = req.params.id;
  fetch('https://api.napster.com/v2.0/playlists/'+ id +'/tracks?apikey=ZTk4OGExZDgtMGRlNS00OTgzLWExMmItNjJjY2E2YzNkNTg1&limit=40')
  .then(response2 => response2.json())
  .then(response2 => {
      
   
  
  Artists.findById(id)
    .then((artist) => {
      res.render("artists/show.liquid", { artist ,
        src:response2.tracks,
        id:id,
      response
      });
    })
  
});
})
    




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

})
.catch(err => console.error(err));








module.exports = router;
