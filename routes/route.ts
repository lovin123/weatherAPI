import { Request, Response } from 'express';
const express = require("express");
const weatherAPI = require('../controllers/weatherAPI');

const app = express();
app.get('/weather', async (req: Request, res: Response) => {
    // get city from query string or use default Pune
    const city = req.query.city || 'Pune';
  
    const data = await weatherAPI(city);
  
    res.json(data);
  });

module.exports = app;