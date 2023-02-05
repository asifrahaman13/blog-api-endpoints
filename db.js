const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://asifr:asifrahaman@cluster0.nelr8ne.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo =  ()=>{
     mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;