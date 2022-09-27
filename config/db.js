const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.DB)
.then(()=>{
    console.log('connected to the database');
})
.catch((err)=>{
    console.log(err);
});
