// import express, { type Request, type Response } from "express";
// import multer from "multer";
// import ImageKit from "imagekit";
// import dotenv from "dotenv";
// import type { NextFunction } from "express-serve-static-core";
// dotenv.config();

// // Initialize ImageKit
// const imagekit = new ImageKit({
//   publicKey: process.env.PUBLIC_KEY!,
//   privateKey: process.env.PRIVATE_KEY!,
//   urlEndpoint: process.env.IMAGEKIT_ENDPOINT!,
// });

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // no larger than 5mb
//   },
// });

// export function uploadSingleImage(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const uploadTask = upload.array("image", 2);

//   uploadTask(req, res, async function (err) {
//     if (err) {
//       return res.send(err);
//     }
//     if (!req.files) {
//       // if (req.params.bookId) {
//       //   return next();
//       // }
//       res.status(400).send("No file uploaded.");
//       return;
//     }
//         req.body.image = uploadedImages;

//     // Upload the image buffer to ImageKit
//     next();
//   });
// }
