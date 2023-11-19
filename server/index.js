require("dotenv").config();
// you need CORS to fetch data
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Comics = require("./models/comics");



const app = express();
const PORT = process.env.PORT || 8000;


connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.get("/api/comics", async (req, res) => {
    try {

        const category = req.query.category;
        console.log(category);

        const filter = {};
        if (category) {
            filter.category = category;
        }



        
        const data = await Comics.find(filter);
        res.json(data);
       
        
        

    } catch (err) {
        res.status(500).json({error: "An error occurred while fetching Comics"});

    }
});



app.get("/api/comics/:slug", async (req, res) => {
    try {
        const slugParam = req.params.slug;
        const data = await Comics.findOne({slug: slugParam});
        res.json(data);
    } catch (err) {
        res.status(500).json({error: "An error occurred while fetching Comics"});

    }
});

app.post("/api/comics", async (req, res) => {
    try {
        console.log(req.body)
        res.json("Data Submitted");
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

