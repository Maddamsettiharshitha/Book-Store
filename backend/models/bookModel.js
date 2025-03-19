const mongoose = require("mongoose");

const book_schema = mongoose.Schema({
    "Book_Name": {
        type: String,
        required: true
    },
    "Author": {
        type: String,
        required: true
    },
    "Cost": {
        type: Number,
        required: true
    }
});

const book_model = mongoose.model("BookStore", book_schema);

module.exports = book_model;