"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter the book name"],
    },
    category: {
        type: String,
        required: [true, "Please enter the author of the book"],
    },
    author: {
        type: String,
        required: [true, "Please enter the author of the book"],
    },
    image: {
        url: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
    },
    file: {
        url: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
    },
    user: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Book = (0, mongoose_1.model)("Books", bookSchema);
exports.default = Book;
