import express from "express";
import expressAsyncHandler from "express-async-handler";
import Books from "../model/book";
import { APIError, validationError } from "../errors";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT!,
});

interface UploadedFile {
  fileType: string;
  url: string;
}

const getAllBooks: express.RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const books = await Books.find();
    res.status(200).json(books);
  }
);
const getBook: express.RequestHandler = expressAsyncHandler(
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.bookId)) throw validationError();
    const book = await Books.findById(req.params.bookId);
    if (!book) throw new APIError("No book found", 404);
    res.status(200).json(book);
  }
);

const addBook: express.RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const { name, author, category, userId } = req.body;
    console.log(req.files);
    console.log(req.files[0]);
    if (!name || !author || !category || !req.files || !userId) {
      throw new APIError("All fields are mandatory", 400);
    }

    const uploadedFiles: UploadedFile[] = [];

    if (Array.isArray(req.files)) {
      for (const file of req.files) {
        const { originalname, buffer } = file;
        try {
          const uploadResponse = await imagekit.upload({
            file: buffer.toString("base64"),
            fileName: originalname,
          });
          uploadedFiles.push({
            url: uploadResponse.url,
            fileType: uploadResponse.fileType,
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          throw new APIError("Failed to upload image", 500);
        }
      }
    }

    const imageIndex = uploadedFiles.findIndex(
      (image) => image.fileType === "image"
    );
    const fileIndex = uploadedFiles.findIndex(
      (file) => file.fileType === "non-image"
    );

    const bookData = {
      name,
      category,
      author,
      image: imageIndex !== -1 ? uploadedFiles[imageIndex] : undefined,
      file: fileIndex !== -1 ? uploadedFiles[fileIndex] : undefined,
      user: userId,
    };

    try {
      const book = await Books.create(bookData);
      res.status(201).json(book);
    } catch (error) {
      console.error("Error creating book:", error);
      throw new APIError("Failed to create book", 500);
    }
  }
);

export { getAllBooks, addBook, getBook };
