const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const cors = require("cors")

// MongoDB connection
let mongoURL = "mongodb://127.0.0.1:27017/portfolio";


// Set up EJS and views
app.engine("ejs", ejsMate); // use ejs-mate for layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Dummy location data
const locations = {
    "place": "kalyani_block_b",
    "lat": 22.9756,
    "lng": 88.4345,
    "address": "B-13, Block-B, near Central Park, Radhakrishnan Bhawan, Kalyani, Nadia, 741235, India"
  }

// API endpoint to get location
app.get("/home/My_Portfolio/get-location", (req, res) => {
    const place = req.query.place; // Read 'place' from query string
  
    const location = locations[place.toLowerCase()];
  
    if (location) {
      res.json(location); // Send lat, lng, and address
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  });
  
// Routes
app.get("/home/portfolio", (req, res) => {
    res.send("Hello guys");
});

// Start server
app.listen(3500, () => {
    console.log("Welcome to my portfolio on port 3500");
});


app.get("/home/My_portfolio", async(req, res)=>{
    res.render("listings/homepage.ejs")
})

app.get("/home/My_portfolio/about", async(req,res)=>{
    res.render("listings/About.ejs")
})

app.get("/home/My_Portfolio/_skill", async(req,res)=>{
    res.render("listings/Skill.ejs")
})

app.get("/home/My_Portfolio/see_PROJECTS", async(req,res)=>{
    res.render("listings/Project.ejs")
})

app.get("/home/My_Portfolio/_Contact_ME", async(req, res)=>{
    res.render("listings/Contact.ejs")
})
