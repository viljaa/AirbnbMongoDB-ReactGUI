/* -- BACKEND -- */

/* Modules */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');

/* App setup */
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Serve client from React build directory
app.use(express.static(path.join(__dirname, '/client/build')));

server.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
});

/* Mongoose setup */
const uri = 'mongodb+srv://testuser:demopass@cluster0-73nr8.mongodb.net/sample_airbnb';
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});

// Schema
const listing = mongoose.model(
    'Listing',{
        _id: String,
        name: String,
        country: String
    },
    'listingsAndReviews'
);

/* Socket setup */

const io = socket(server);

io.on('connection', (socket)=>{
    // On connection
    console.log(`Socket ${socket.id} connected to the server.`);

    /* Listen incoming events */
});