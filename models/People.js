const mongoose = require('mongoose')
const Schema = mongoose.Schema

const peopleSchema = new Schema({
    name: String,
    phone: String

});

module.exports = mongoose.model('People', peopleSchema)