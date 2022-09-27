const mongoose = require('mongoose');
const valid = require('validator');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cookiesParser = require('cookies-parser');

const schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        validate(value){
            if(!valid.isEmail(value)){
                throw new Error('please insert a valid email');
            }
        }},
    password:{
        type: String,
        required:true,
        validate(value){
            if(value<0){
                throw new Error('please insert a valid password');
            }
        }
    },
    confirmPassword:{
        type: String,
        required: true,
    },


});

schema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    this.confirmPassword = undefined;
    next();
});

module.exports = mongoose.model('usersTable',schema);