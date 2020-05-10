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

    socket.on('addListing',(data)=>{
        addListing(data);
    });

    socket.on('updateListing', (data)=>{
        updateListing(data);
    });

    socket.on('deleteListing', (data)=>{
        deleteListing(data);
    });
        
});

/* Functions */

function findMatches(socket,data){

    let query = {};

    // Check if fields are defined and if true, append to query     
    if(data.name) {
        let regexp = '.*'+data.name+'.*';
        query.name = {$regex : regexp, $options: 'i'};
    };
    if(data.city) {
        let regexp = '.*'+data.city+'.*';
        query = {'address.market': {$regex : regexp, $options: 'i'}};
    };
    if(data.country) {
        let regexp = '.*'+data.country+'.*';
        query = {'address.country': {$regex : regexp, $options: 'i'}};
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
        let matches = [];
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

function addListing(data){

    let entry = {
        _id: data.id,
        name: data.name,
        address:{
            market: data.city,
            country: data.country
        },
        listing_url: data.url,
        images:{
            picture_url: data.picture_url
        },
        price: data.price,
        beds: data.beds
    }

    mongoose.connection.collection('listingsAndReviews').insert(entry, (err, result)=>{
        if(err){
            console.error(err);
        }
        else{
            console.log(`Inserted: ${result.insertedCount}`);
            console.log(`Entry saved! ID: ${entry._id}`);
        };
    });
};

function updateListing(data){
    // Create query object
    let query = {}
    // Loop through the object to remove empty fields
    for (let i in data){
        if(data[i] === null || data[i] === undefined){
            delete data[i];
        };
    };
    // Create query
    if(data.name){
        query = {name: data.name}
    };
    if(data.city){
        query = {"address.market":data.city}
    };
    if(data.country){
        query = {"address.country":data.country}
    };
    if(data.url){
        query = {listing_url:data.url}
    };
    if(data.picture_url){
        query = {"images.picture_url":data.picture_url}
    };
    if(data.price){
        query = {price: data.price}
    };
    if(data.beds){
        query = {beds: data.beds};
    };

    console.log(query);

    // Find the listing to update and update data
    listing.findByIdAndUpdate(data.id, query, {new:true},(err,result)=>{
        if (err){
            console.log('Error occured while trying to update entry.')
            console.error(err);
        }
        else{
            console.log(`Entry with id ${data.id} updated successfully!`);
            console.log(result);
        };
    });
};

function deleteListing(data){
    let id = data.id;

    listing.findByIdAndDelete(id,(err, result)=>{
        if (err){
            console.error(err);
        }
        else{
            console.log(`Entry with ID:${id} deleted successfully.`);
        };
    });
};