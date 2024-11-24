require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);

const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/userModel');
const Note = require('./models/noteModel')

const jwt = require('jsonwebtoken');
const {authenticateToken} = require("./utilities")

app.use(express.json());


app.use(cors({
    origin: "*", // Frontend's deployed URL
  }));

  
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
    const isUser = await User.findOne({ email: email});

    if(isUser) {
        return res.json ({
            error: true,
            message: "User already exists"
        })
    }
    const user = new User ({
        fullName,
        email,
        password,
    });
    await user.save();
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600s"
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "registered successfully"
    })
    
})
app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    if(!email) {
        return res.status(400).json({message: "Email is required"})
    }

    if(!password) {
        return res.status(400).json({message: "Password is required"})
    }
    const userInfo = await User.findOne({email: email});

    if(!userInfo){
        return res.status(400).json({message: "user not found"});
    }
    if(userInfo.email == email && userInfo.password == password) {
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "3600s"
        });
        return res.json({
            error:false,
            message: "Login Sucessful",
            email,
            accessToken,
        })
    } else {
        return res.status(400).json({
            error:true,
            message: "User not found",
        });
    }
})

app.get("/get-user", authenticateToken, async (req, res) => {
  try {
    const { user } = req.user; // Ensure authenticateToken sets req.user correctly

    const isUser = await User.findOne({ _id: user._id });
    if (!isUser) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.json({
      user: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn,
      },
    });
  } catch (error) {
    console.error("Error in /get-user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/add-note", authenticateToken, async (req, res) => {
    const {title, content} = req.body;
    const {user} = req.user;

    if(!title) {
        return res.status(400).json({error:true, message:"title is required"})
    }
    if(!content) {
        return res.status(400).json({error:true, message:"content is required"})
    }
    try {
        const note = new Note({
            title,
            content,
            userId: user._id,
        })
        await note.save();
         return res.json({
            error:false,
            note,
            message: "note added successfully"
         });
    } catch(error) {
        return res.status(400).json({error:true, message: "internal error"});
    }
})

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const {title, content, isPinned} = req.body;
    const {user} = req.user;

    if(!title && !content) {
        return res.status(404).json({
            error: true,
            message: "no changes Provided"
        })
    }
    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note){
            return res.status(404).json({error: true, message: "note not found"})
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(isPinned) note.isPinned = isPinned;
        
        await note.save();
        return res.json({
            error: false,
            note,
            message: "note updated successfully"
        })

    } catch(error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const {user} = req.user;

    try {
        const notes = await Note.find({ userId: user._id}).sort({isPinned: -1});
        return res.json({
            error: false,
            notes,
            message: "Note updated successfully"
        })
    } catch(error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const {user} = req.user;

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note){
            return res.status(404).json({
                error: true,
                message: "Note not found"
            })
        }

        await note.deleteOne({_id: noteId, userId: user._id});

        return res.json({
            error: false,
            message: "Note deleted successfully"
        })
    }
    catch(error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

app.put("/update-note-pin/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const {isPinned} = req.body;
    const {user} = req.user;

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note){
            return res.status(404).json({error: true, message: "note not found"})
        }

        note.isPinned = isPinned;
        
        await note.save();
        return res.json({
            error: false,
            note,
            message: "note updated successfully"
        })

    } catch(error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

app.get("/search-notes/", authenticateToken, async (req, res) => {
    const {user} = req.user;
    const {query} = req.query;

    if(!query){
        return res.status(400).json({
            error: true,
            message: "Search Query Required"
        })
    }
    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                {title: {$regex: new RegExp(query, "i")}},
                {content: {$regex: new RegExp(query, "i")}},
            ]
        })

        return res.json({
            error: false,
            note: matchingNotes,
            message: "Note retrieved"
        })
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})

app.listen(8000);
console.log("app running")
module.exports = app;