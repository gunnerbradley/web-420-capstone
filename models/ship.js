// /*
// ============================================
// ; Title: ship.js
// ; Author: Gunner Bradley
// ; Date: 18 November 2021
// ; Description: schema routes file for WEB 420 RESTful APIs capstone project
// ;===========================================
// */
const mongoose = require('mongoose'); //import mongoose

 let Schema = mongoose.Schema;

  //crew db schema
  const crewSchema = new Schema({
    firstName:  String,
    lastName: String,
    position: String
  });

  //ship db schema
  const shipSchema = new Schema({
    name:  String,
    purpose: String,
    crew: [crewSchema] //document array of objects
  }, {collection: 'ships'});

let Ship = mongoose.model("Ship", shipSchema);

// Export the Ship model
module.exports = Ship;
