
const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const carSchema = new mongoose.Schema({
name:{
    type: String,
    required: true,
},
    km:{
        type: Number,
        required: true,
    },
     scratches:{
        type: Number,
        required: true,
     }, 
    originalPaint:{
        type: String,
        required: true,
    }, 
    accidents:{
        type: Number,
        required: true,
    },
    buyers:{
        type: Number,
        required: true,
    }, 
    registrationPlace:{
        type: String,
        required: true,
    },








    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  });
  module.exports = mongoose.model("cars", carSchema);