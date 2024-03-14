import { Document, Schema, model } from "mongoose";
import type { IUser } from "./user";

export interface IBook extends Document {
  name: string;
  author: string;
  category: string;
  image: { url: string; fileType: string };
  file: { url: string; fileType: string };
  user: IUser;
}

const bookSchema: Schema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook>("Books", bookSchema);

export default Book;
