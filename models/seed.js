const mongoose = require("./connection");
const Artist = require("./artist");

const db = mongoose.connection;


db.on("open", () => {

  const startArtists = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];

  // Delete all Artists
  Fruit.deleteMany({})
    .then((deletedArtists) => {
      // add the starter Artists
      Fruit.create(startArtists)
        .then((newArtists) => {
          // log the new Artists to confirm their creation
          console.log(newArtists);
          db.close();
        })
        .catch((error) => {
          console.log(error);
          db.close();
        });
    })
    .catch((error) => {
      console.log(error);
      db.close();
    });


});
