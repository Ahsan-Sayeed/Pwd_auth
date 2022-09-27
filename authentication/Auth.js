const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UsersTable = require('../models/user.model');

exports.AuthPass = async(req,res,next)=>{
   try{
    const queryEmail = await UsersTable.find({email:req.body.email});
    const hashedPassword = queryEmail[0].password;
    
    if(queryEmail[0].email===req.body.email){
        const result = await bcrypt.compare(req.body.password,hashedPassword);
        if(result){
            next();
        }
        else{
            console.log('wrong password');
        }
    }
    else{
        console.log('account does not exist');
    }

   }
   catch(err){
    console.log(err)
   }
    
}   

////auth token
exports.AuthToken = async(req,res,next)=>{
    // const table = await UsersTable.find({email:req.body.email}); table[0]._id
    if(req.cookies.jwt===undefined){
     next();
     }else{
       res.redirect('/home');
    }
}

//auth home page
exports.AuthHome = (req,res,next) =>{
    if(req.cookies.jwt){
        next();
    }
    else{
        res.redirect('/login');
    }

}