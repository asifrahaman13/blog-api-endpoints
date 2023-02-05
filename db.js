const mongoose = require('mongoose');

// Mongodb atlas connection URL
const mongoURI = "mongodb+srv://asifr:asifrahaman@cluster0.nelr8ne.mongodb.net/?retryWrites=true&w=majority"

// Function to connect to mongodb atlas
const connectToMongo =  ()=>{
     mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;