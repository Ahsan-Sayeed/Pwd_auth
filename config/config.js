require('dotenv').config(); 

const config = {
    PORT:process.env.port || 5000,
    DB: process.env.DB || 'mongodb://localhost:27017/users'
}

module.exports = config;