const express = require('express');
const { getIndexPage, loginPage, signup, loginPagePost, signupPost, homePage } = require('../controllers/user.controller');
const router = express.Router();
const {AuthPass,AuthToken, AuthHome} = require('../authentication/Auth');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/',getIndexPage);
//log in page
router.get('/login',AuthToken,loginPage);
router.post('/login',AuthPass,loginPagePost);
//sign up page
router.get('/signup',signup);
router.post('/signup',signupPost);
//home page
router.get('/home',AuthHome,homePage);

module.exports = router;