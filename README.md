# weatherAPI
API:
localhost:3000/weather?city=cityToSearch

city: city name you want to search. If not given, by default it will search for Pune.

Example:
localhost:3000/weather?city=Delhi

Setup:
1) Clone repo
2) npm install
3) npm start

Schema:
There are 3 Collections:
1) auditCity: Holds city related data like cityname, countryCode, latitude, longitude etc.
2) auditWeather: Holds data like windspeed, pressure, humidity etc.
3) auditTemp: Holds temperature related data like current temp, max temp, min temp etc.
