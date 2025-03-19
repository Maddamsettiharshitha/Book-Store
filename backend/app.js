const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/bookRoutes"); // Import the book routes

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/")
    .then(() => {
        console.log("Connected to DataBase");
    })
    .catch((err) => {
        console.log("Error connecting to the database:", err);
    });

const port = 5000;

app.use(cors());  // Enable CORS for cross-origin requests
app.use(express.json());  // Parse incoming JSON requests

// Use the routes defined in bookRoutes.js
app.use("/api", route);  // This will prefix the routes with "/api", like /api/books

// Start the server
app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});
