
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const ArtistsRouter = require("./controllers/artists.js");
const UserRouter = require("./controllers/users.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");


const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
});

app.use(morgan("tiny")); //logging
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 

app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

app.use("/artists", ArtistsRouter); 
app.use("/users", UserRouter); 


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Now Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.render("index.liquid");
});
