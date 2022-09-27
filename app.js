const express = require('express');
const app = express();
const UserRouter = require('./routes/user.router');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(UserRouter);


module.exports = app;