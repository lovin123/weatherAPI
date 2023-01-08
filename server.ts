const app = require('./routes/route');
const dotenv = require('dotenv').config();
const connectDatabase = require("./config/config.ts");

// Connect to the MongoDB database
connectDatabase();


app.listen(3000, () => {
  console.log(`Server is working on Port 3000`);
});
