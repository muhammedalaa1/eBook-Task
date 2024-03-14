"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBook = exports.addBook = exports.getAllBooks = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const book_1 = __importDefault(require("../model/book"));
const errors_1 = require("../errors");
const imagekit_1 = __importDefault(require("imagekit"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const imagekit = new imagekit_1.default({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});
const getAllBooks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_1.default.find();
    res.status(200).json(books);
}));
exports.getAllBooks = getAllBooks;
const getBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(req.params.bookId))
        throw (0, errors_1.validationError)();
    const book = yield book_1.default.findById(req.params.bookId);
    if (!book)
        throw new errors_1.APIError("No book found", 404);
    res.status(200).json(book);
}));
exports.getBook = getBook;
const addBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, author, category, userId } = req.body;
    console.log(req.files);
    console.log(req.files[0]);
    if (!name || !author || !category || !req.files || !userId) {
        throw new errors_1.APIError("All fields are mandatory", 400);
    }
    const uploadedFiles = [];
    if (Array.isArray(req.files)) {
        for (const file of req.files) {
            const { originalname, buffer } = file;
            try {
                const uploadResponse = yield imagekit.upload({
                    file: buffer.toString("base64"),
                    fileName: originalname,
                });
                uploadedFiles.push({
                    url: uploadResponse.url,
                    fileType: uploadResponse.fileType,
                });
            }
            catch (error) {
                console.error("Error uploading image:", error);
                throw new errors_1.APIError("Failed to upload image", 500);
            }
        }
    }
    const imageIndex = uploadedFiles.findIndex((image) => image.fileType === "image");
    const fileIndex = uploadedFiles.findIndex((file) => file.fileType === "non-image");
    const bookData = {
        name,
        category,
        author,
        image: imageIndex !== -1 ? uploadedFiles[imageIndex] : undefined,
        file: fileIndex !== -1 ? uploadedFiles[fileIndex] : undefined,
        user: userId,
    };
    try {
        const book = yield book_1.default.create(bookData);
        res.status(201).json(book);
    }
    catch (error) {
        console.error("Error creating book:", error);
        throw new errors_1.APIError("Failed to create book", 500);
    }
}));
exports.addBook = addBook;
