
  const mongoose = require('./connection.js')

const { Schema, model } = mongoose;
const artistsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: String,
  });

const Artits = model("Artist", artistsSchema);

module.exports = Artits;