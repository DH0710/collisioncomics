require("dotenv").config();
// you need CORS to fetch data
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Comics = require("./models/Comics");
const multer = require("multer");



const app = express();
const PORT = process.env.PORT || 8000;


connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
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
    res.status(500).json({ error: "An error occurred while fetching Comics" });

  }
});



app.get("/api/comics/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const data = await Comics.findOne({ slug: slugParam });

    if (!data) {
      throw new Error("An error occurred while fetching a comic.");
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching comics." });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
})

const upload = multer({ storage: storage })


app.post("/api/comics", upload.single("thumbnail"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);


    const newComic = new Comics({
      title: req.body.title,
      slug: req.body.slug,
      collisions: req.body.collisions,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.filename,
    })

    await Comics.create(newComic);
    res.json("Data Submitted");
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching comics." });
  }
});







app.put("/api/comics", upload.single("thumbnail"), async (req, res) => {
  try {

    const comicId = req.body.comicId;

    const editComic = {
      title: req.body.title,
      slug: req.body.slug,
      collisions: req.body.collisions,
      description: req.body.description,
      category: req.body.category,
    }

    if (req.file) {
      editComic.thumbnail = req.file.filename;
    }

    await Comics.findByIdAndUpdate(comicId, editComic);
    res.json("Data Submitted");
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching comics." });
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

