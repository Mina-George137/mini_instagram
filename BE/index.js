// init express
const express = require('express');
const app = express();

// use dotenv to secure the environment variables
require('dotenv').config();
const port = process.env.PORT;

// use cors to allow requests from the frontend
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// use body-parser to parse the request body
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '1000mb' }));

// init database connection
const initConnection = require('./DB/config');
initConnection();

// use the routes
const {userRoutes,mediaRoutes} = require('./src/routes/routes');
app.use('/api/user', userRoutes);
app.use('/api/media', mediaRoutes);


app.get('/', (req, res) => {res.json({message: 'Media Sharing app listening'})})


app.listen(port, () => console.log('Media Sharing app listening on port ' + port +'!'))
