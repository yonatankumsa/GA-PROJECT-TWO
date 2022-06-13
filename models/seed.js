const mongoose = require("./connection");
const Fruit = require("./fruit");

const db = mongoose.connection;


db.on("open", () => {

  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];

  // Delete all fruits
  Fruit.deleteMany({})
    .then((deletedFruits) => {
      // add the starter fruits
      Fruit.create(startFruits)
        .then((newFruits) => {
          // log the new fruits to confirm their creation
          console.log(newFruits);
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
