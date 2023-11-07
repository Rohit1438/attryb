
const mongoose = require("mongoose");


const OEMSchema = new mongoose.Schema({
name:{
    type: String,
    required: true,
},
    year:{
        type: Number,
        required: true,
    },
     price:{
        type: Number,
        required: true,
     }, 
    availableColors:{
        type: String,
        required: true,
    }, 
    mileage:{
        type: Number,
        required: true,
    },
    power:{
        type: Number,
        required: true,
    }, 
    maxSpeed:{
        type: Number,
        required: true,
    }








    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });
  module.exports = mongoose.model("oem", OEMSchema);