const mongoose = require("./connection");
const Artist = require("./artist");

const db = mongoose.connection;


fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=1f64c77f198e662756b17883ce861df4&format=json')
.then(response => response.json())
.then(response => {
console.log(response)
})



