const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require('./routes/userRoute.js')
const chatRoute = require('./routes/chatRoute.js')
const messageRoute = require('./routes/messageRoute.js')

const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.get("/", (req, res) => {
    res.send("Welcome to our chat app")
});


const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`)
})
mongoose.connect(uri).then(() => console.log("MongoDB connection established")).catch((error) => { console.log("Mongo Connection failed", error.message) })