const express = require('express');
const connectToMongo = require('./database/dbconnect')
const app = express();

var cors = require('cors')
app.use(cors())

//Import Routes
const authRoute = require('./routes/auth');
const notesRoute = require('./routes/notes');

//fetch environment variables from .env file
//npm i dotenv
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const mongoURI = process.env.DB_CONNECT;

//connect to DataBase
connectToMongo(mongoURI);


//Middleware
app.use(express.json());

//Route middlewares
app.use('/api/auth', authRoute);
app.use('/api/notes', notesRoute);


app.get('/', (req, res) => {
    res.send("Hello world! This is home page of this API.");
})

// Run server omn given port
app.listen(port, () => {
    console.log(`iNotebook is Running on port ${port}`);
})