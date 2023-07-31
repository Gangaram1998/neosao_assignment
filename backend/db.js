const mongoose = require('mongoose');
require('dotenv').config()

//Making connection with the database

const connection = mongoose.connect(process.env.MONGOURI)


// Exporting connection 

module.exports ={
    connection
}