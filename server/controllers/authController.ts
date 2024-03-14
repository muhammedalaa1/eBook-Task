import expressAsyncHandler from "express-async-handler";
import express from "express";
import User from "../model/user";
import { APIError, validationError } from "../errors";
import { createToken } from "../utils/jwtToken";
import bcrypt, { compareSync } from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const Register = expressAsyncHandler(async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const { userName, email, password, phone } = req.body;
  console.log(req.body);
  if (!userName || !email || !password || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  req.body.password = hashedPassword;
  const exist = await User.findOne({
    $or: [
      {
        email: req.body.email,
      },
      {
        phone: req.body.phone,
      },
    ],
  });

  if (exist) throw new APIError("User Exist", 409);

  let user = await User.create(req.body);

  if (!user) throw new APIError("Failed to create user", 500);
  const token = createToken(user);
  res.cookie(process.env.AUTH_COOKIE, token, {
    httpOnly: process.env.NODE_ENV == "production" ? false : true,
    sameSite: process.env.NODE_ENV == "production" ? "none" : "lax", // Set SameSite to None for production
    path: "/",
    secure: process.env.NODE_ENV == "production",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
  });
  user = { ...user.toObject(), token } as any;
  res.status(201).json(user);
});

export const Login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new APIError("Check Fields", 400);
  let exist = await User.findOne({ email });
  if (!exist) throw new APIError("There is no account with this email", 400);

  if (!compareSync(password, exist.password))
    throw new APIError("Invalid Password", 400);
  const token = createToken(exist);
  res.cookie(process.env.AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
    path: "/",
    secure: process.env.NODE_ENV == "production",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
  });
  exist.password = undefined;
  exist = { ...exist.toObject(), token } as any;
  res.status(200).json(exist);
});

export const Logout = expressAsyncHandler(async (req, res) => {
  res
    .clearCookie(process.env.AUTH_COOKIE, { sameSite: "none", secure: true })
    .status(200)
    .json({ status: "Logged out" });
});

export const getAllUsers: express.RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const users = await User.find();
    const number = await User.countDocuments();
    res.status(200).json({ users, number });
  }
);
