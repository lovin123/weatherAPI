import mongoose from "mongoose";
const auditTemp = new mongoose.Schema({
    date: Date,
    cityname: String,
    countryCode: String,
    temperature:Number,
    feels_like:Number,
    temp_min:Number,
    temp_max:Number,
  });

module.exports = mongoose.model("auditTemp",auditTemp);