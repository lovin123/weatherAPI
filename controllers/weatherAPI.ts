import axios from 'axios';
const auditCity = require('../model/auditCity');
const auditWeather = require('../model/auditWeather');
const auditTemp = require('../model/auditTemp');

function isPrime(num: number) {
  if (num < 2) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const weatherAPI = async(city:String) => {

     // Get the current day of the month
  const currentDay = new Date().getDate();
  const currentDate = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the current day is a prime number
  if (isPrime(currentDay)) {
    
    try {
      
      let returnData: Object = {};

     // Checking if cityData already exist in database, if it exist then directly fetch from database and store in check1 variable
     const check1 = await auditCity.findOne({cityname:city.toLowerCase()});
     
     if(!check1){
      // city data doesn't exist in database. Return the fetched city data from weatherAPI and save in mongodb locally
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
      const cities: Object = {
        date: new Date(),
        cityname: city.toLowerCase(),
        lon: response.data.coord.lon,
        lat: response.data.coord.lat,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        countryCode: response.data.sys.country
      };
      const cityData = new auditCity(cities);
      await cityData.save();
      Object.assign(returnData, cities);
    }
    else{
      // City Data already exist in database. Get the required fields from check1 and return from database
      Object.assign(returnData, {
        date: check1.date,
        cityname: check1.cityname,
        lon: check1.lon,
        lat: check1.lat,
        sunrise: check1.sunrise,
        sunset: check1.sunset,
        countryCode: check1.countryCode
       });
    }
    
    // Checking if weather Data already exist in database, if it exist then directly fetch from database and store in check2 variable
    const check2 = await auditWeather.findOne({cityname:city.toLowerCase(), date: { $gte: yesterday, $lte: currentDate }});
      
    if(!check2){
      // weather data doesn't exist in database. Return the fetched weather data from weatherAPI and save in mongodb locally 
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
      const weather: Object = {
        date: new Date(),
        cityname: city.toLowerCase(),
        countryCode: response.data.sys.country,
        visibility: response.data.visibility,
        description: response.data.weather.description,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        windspeed: response.data.wind.speed,
        wind_direction: response.data.wind.deg
      };
      const weatherData = new auditWeather(weather);
      await weatherData.save();  
      Object.assign(returnData, weather);
    }
    else{
      // weather Data already exist in database. Get the required fields from check2 and return from database
      Object.assign(returnData, {
        date: check2.date,
        cityname: check2.cityname,
        countryCode: check2.countryCode,
        visibility: check2.visibility,
        description: check2.description,
        pressure: check2.pressure,
        humidity: check2.humidity,
        windspeed: check2.windspeed,
        wind_direction: check2.wind_direction
      });
    }
     
    // Checking if temperature Data already exist in database, if it exist then directly fetch from database and store in check3 variable
    const check3 = await auditTemp.findOne({cityname:city.toLowerCase(), date: { $gte: yesterday, $lte: currentDate }});
      
    if(!check3){
      // temperature data doesn't exist in database. Return the fetched temperature data from weatherAPI and save in mongodb locally.
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
      const temperature: Object = {
        date: new Date(),
        cityname: city.toLowerCase(),
        countryCode: response.data.sys.country,
        temperature: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max
      };
      const temperatureData = new auditTemp(temperature);
      await temperatureData.save(); 
      Object.assign(returnData, temperature);
    }
    else{
      // temperature Data already exist in database. Get the required fields from check3
      Object.assign(returnData, {
      date: check3.date,
      cityname: check3.cityname,
      countryCode: check3.countryCode,
      temperature: check3.temperature,
      feels_like: check3.feels_like,
      temp_min: check3.temp_min,
      temp_max: check3.temp_max
      });
    }

    return returnData;

    } catch (error) {
      return 'Error getting data from OpenWeatherMap API';
    }
  } else {
    // Send a message if the current day is not a prime number
    return 'Date is not prime so no data';
  }
}


module.exports = weatherAPI;











