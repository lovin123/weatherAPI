import mongoose from "mongoose";
const auditWeather = new mongoose.Schema({

    date: Date,
    cityname: String,
    countryCode: String,
    visibility:Number,
    description:String,
    pressure:Number,
    humidity:Number,
    windspeed:Number,
    wind_direction:Number
  });

module.exports = mongoose.model("auditWeather",auditWeather);
