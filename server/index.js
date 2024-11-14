require("dotenv").config();

const config = require("/config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);

const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/userModel');

const jwt = require('jsonwebtoken');
const {authenticateToke} = require("/utilities")

app.use(express.json());


app.use(
    cors({
        origin: "*"
    })
);
app.get("/", (req, res) => {
    res.send("api running")
});

//create account
app.post("/create-account", async(req, res) => {
    const {fullName, email, password} = req.body;

    if (!fullName) {
        return res.status(400).json({ message: "Full name is required" });
    }
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    const iUser = await User.findOne({ email: email});

    if(iUser) {
        return res.json ({
            error: true,
            message: "User already exists"
        })
    }
    const user = new User ({
        fullName,
        email,
        password
    });
    await user.save();
    const accessToken = jwt.sign({user}, process.env.ACCESS_tOKEN_SECRET, {
        expiresIn: "30m"
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "registered successfully"
    })
})
app.listen(4000);
console.log("app running")
module.exports = app;