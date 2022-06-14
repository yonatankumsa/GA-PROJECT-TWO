
  const mongoose = require('./connection.js')

const { Schema, model } = mongoose;
const artistsSchema = new Schema({
    name: String,
    genre: String,
    image:String,
    username: String,
  });

const Artits = model("Artist", artistsSchema);

module.exports = Artits;