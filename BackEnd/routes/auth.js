const express = require('express');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')
var bcrypt = require('bcryptjs');
const { Router } = require('express');
const varifyToken = require('./varifyToken')
const route = express.Router();




// 1. Register a New User Using " post : /api/auth/register " no login required
route.post('/register', async (req, res) => {
    let success = false;
    //Lets validate the data before we make a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ success, error: error.details[0].message });

    //check user is already exist or not
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).json({ success, error: "User with this email is already exist." });
    }

    //Hashing the Password
    //npm i bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a New User
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        success=true;
        res.json({ success, user: user._id });
    } catch (error) {
        success = false;
        res.status(500).json({ success, error: "Internal server error" });
    }
})



// 2. Login a existing User Using " post : /api/auth/login " no login required

route.post('/login', async (req, res) => {
    let success = false;
    try {
        //Lets validate the data before we make a user
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).json({ success, error: error.details[0].message });

        //checking if the email exist..
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ success, error: "Login credentials are Invalid...(email)" });
        //check password is correct or not..
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ success, error: "Login credentials are Invalid...(password)" });


        //create and assign a token for loggedin user
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        success = true;
        res.json({ success, 'authtoken': token });
    } catch (error) {
        success = false;
        res.status(500).json({ success, error: "Internal server error" });
    }

})


// 3. Display loggedIn user data Using " get : /api/auth/fetchuser " login user required

route.get("/fetchuser", varifyToken, async (req, res) => {
    let success = true;
    try {
        const user = await User.findOne({ _id: req.user._id }).select("-password");
        res.json({ success, user });
    } catch (error) {
        success = false;
        res.status(500).json({ success, error: "Internal server error" });
    }
});



module.exports = route;