require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// connect DB when server starts
connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});