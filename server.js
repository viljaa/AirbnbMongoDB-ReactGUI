/* -- BACKEND -- */

/* Modules */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const socket = require('socket.io');

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
        address:{
            market: String,
            country: String
        },
        city: String,
        summary: String,
        images:{
            picture_url: String
        },
        listing_url: String,
        price: Number,
        beds: Number
    },
    'listingsAndReviews'
);

/* Socket setup */

const io = socket(server);

io.on('connection', (socket)=>{
    // On connection
    console.log(`Socket ${socket.id} connected to the server.`);

    /* Listen incoming events */
    socket.on('queryData', (data)=>{
        console.log(data);
        findMatches(socket,data);
    });
});

/* Functions */

function findMatches(socket,data){

    let query = {};

    // Check if fields are defined and if true, append to query     
    if(data.name) {
        let regexp = '.*'+data.name+'.*';
        query.name = {$regex : regexp};
    };
    if(data.city) {
        let regexp = '.*'+data.city+'.*';
        query = {'address.market': {$regex : regexp}};
    };
    if(data.country) {
        let regexp = '.*'+data.country+'.*';
        query = {'address.country': {$regex : regexp}};
    };
    if(data.nroOfBeds) {
        query.beds = data.nroOfBeds;
    };
    if(data.price) {
        query.price = {$lte: data.price};
    };

    // Query the DB
    listing.find(query,null, {limit:50},(err, results)=>{
        if (err) console.log(err);

        // Create object to store the filtered results
        let matches = {};
        for(i in results){
            matches[i] = {
                name: results[i].name,
                city: results[i].address.market,
                country: results[i].address.country,
                price: results[i].price,
                summary: results[i].summary,
                url: results[i].listing_url,
                beds: results[i].beds,
                picture_url: results[i].images.picture_url
            }
        };
        // Send results to the client
        socket.emit('queryResults', matches);
    });
};