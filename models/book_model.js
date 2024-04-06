const mongoose = require("mongoose");

const book_schema = mongoose.Schema(
    {
        id: { type: String, required: false },
        book_title: { type: String, required: true },
        genre: { type: String, required: true },
        writer: { type: String, required: true },
        pages_number: { type: Number, required: true },
        publisher: { type: String, required: true },
        release_date: { type: String, required: true }
    },{ collection: 'data_documents' });
const Book = mongoose.model("Book", book_schema);

module.exports = Book;