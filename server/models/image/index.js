const mongoose = require('mongoose');

const imageSchema =  mongoose.Schema({
    filename: {
        type: String,
    },
    publish_date: {
        type: Date,
    },
    publish_time: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Image = mongoose.model('Image', imageSchema, 'Image');

module.exports = Image