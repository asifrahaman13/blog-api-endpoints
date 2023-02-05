const mongoose = require('mongoose');
const { Schema } = mongoose;

// Make a schema object for the blog
const BlogSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    createdby:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  // Create a blogs model
  module.exports = mongoose.model('blogs', BlogSchema);