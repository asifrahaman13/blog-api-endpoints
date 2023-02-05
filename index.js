const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

// Connect to MongoDB database
connectToMongo();
// Use express module in Node JS
const app = express()

// Define the port where you need to run the server
const port = 5000

// Use cors to avoid cors error
app.use(cors())

// Use json to let the application know how to use json object
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/blogs', require('./routes/blogs'))

// Listen to the ports
app.listen(port, () => {
  console.log(`iblogbook backend listening at http://localhost:${port}`)
})

module.exports=app