const express = require("express");
const router = express.Router();  // Ensure this line is here

const { getBook, postBook, putBook, deleteBook } = require("../controllers/bookController");

// Define your routes here
router.get("/books", getBook);
router.post("/books", postBook);
router.put("/books/:id", putBook);
router.delete("/books/:id", deleteBook);

module.exports = router;  // This should export the router, not an object
