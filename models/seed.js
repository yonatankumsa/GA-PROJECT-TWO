const mongoose = require("./connection");
const Artist = require("./artist");

const db = mongoose.connection;


db.on('open',()=>{
    

      // Delete all builds
  Artist.deleteMany({})
  .then((deletedtracks) => {
    // add the starter builds
    Artist.create()
      .then((newBuilds) => {
        // log the new builds to confirm their creation
        console.log(newBuilds)
        db.close()
      })
      .catch((error) => {
        console.log(error)
        db.close()
      })
  })
  .catch((error) => {
    console.log(error)
    db.close()
  })
})



