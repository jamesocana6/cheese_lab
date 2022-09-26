require("dotenv").config();
const express = require("express");
const app = express();
const {PORT , DATABASE_URL} = process.env;
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//MONGODB CONNECT
mongoose.connect(DATABASE_URL);

mongoose.connection
.on("open", () => console.log("We have connected to the mongo database."))
.on("close", () => console.log("We have disconnected from the mongo database."))
.on("error", (error) => console.log(error));

//MODEL
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String,
});

const Cheese = mongoose.model("Cheese", CheeseSchema);

//ROUTES
app.get("/", (req, res) => {
    res.send("Hello cheese lovers of the world")
});

//I
app.get("/cheese", async (req, res) => {
    try {
        res.json(await Cheese.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//N

//D
app.delete("/cheese/:id", async (req, res) => {
    try {
        res.json(await Cheese.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

//U
app.put("/cheese/:id", async (req, res) => {
    try {
        res.json(await Cheese.findByIdAndUpdate(req.params.id ,req.body, {new: true}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//C
app.post("/cheese", async (req, res) => {
    try {
        res.json(await Cheese.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

//E

//S


app.listen(PORT, () => {
    console.log("We have connected on port: " , PORT);
});
