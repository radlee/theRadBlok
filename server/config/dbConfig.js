const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);
// mongoose.connect("mongodb+srv://radlee:Leander247365@radblok.ubznfgv.mongodb.net/");
mongoose.connect("mongodb+srv://radlee:Leander247365@radblok.ubznfgv.mongodb.net/radblok");

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo DB connected successfully");
});

connection.on("error", (err) => {
  console.log("Mongo DB connection failed");
});


module.exports = connection;