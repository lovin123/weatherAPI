import mongoose from "mongoose";
const auditCity = new mongoose.Schema({
    date: Date,
    cityname: String,
    lon: Number,
    lat: Number,
    sunrise:Number,
    sunset:Number,
    countryCode: String,

  });

module.exports = mongoose.model("auditCity",auditCity);
