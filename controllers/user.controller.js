const mongoose = require('mongoose');
const UsersTable = require('../models/user.model');
const path = require("path");


//create a token
const jwt = require('jsonwebtoken');
const createToken = (id)=>{
    return jwt.sign({id},'this is secret key',{expiresIn:100000000});
}
//

exports.getIndexPage = (req,res)=>{
    res.status(200).sendFile(path.join(__dirname,"../views/index.html"));
}

//login page
exports.loginPage = (req,res) =>{
        //route to home page{if true}
       //route to login page {if false}
    res.status(200).sendFile(path.join(__dirname+'/../views/login.html'));
}
exports.loginPagePost = async (req,res) =>{
    res.status(200);
    const table = await UsersTable.find({email:req.body.email});
    const token = createToken(table[0]._id);
    res.cookie('jwt',token,{maxAge:1000000000*1000});
    //.sendFile(path.join(__dirname+'/../views/home.html'));
    res.redirect('/login');
}

//sign up page
exports.signup = (req,res) =>{
    res.status(200).sendFile(path.join(__dirname+'/../views/signup.html'));
}
exports.signupPost = async (req,res) =>{
    try{
        const file = new UsersTable({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        });
       
        const emailVer = await UsersTable.find({email:req.body.email});
      
           /////////////////
            if(req.body.password==req.body.confirmPassword){
                const result = await file.save();
                console.log(result);
                res.status(200).sendFile(path.join(__dirname+'/../views/login.html'));            
            }
            else{
                console.log('password do not match');
            } 
            ///////////////

    }
    catch(err){
        console.log(err);
    }

}

exports.homePage = (req,res) =>{
    res.status(200).sendFile(path.join(__dirname+'/../views/home.html'))
}