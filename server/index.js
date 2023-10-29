require("dotenv").config();
// you need CORS to fetch data
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Comics = require("./models/Comics");


const app = express();
const PORT = process.env.PORT || 8000;


connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.get("/api/Comics", async (req, res) => {
    try {
        const data = await Comics.find({});
        res.json(data);
        

    } catch (err) {
        res.status(500).json({error: "An error occurred while fetching Comics"});

    }
});














app.get("/", (req, res) => {
    res.json("Hello Damien your server is running now!")
});

app.get("*", (req, res) => {
    res.sendStatus("404")
});





app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});

