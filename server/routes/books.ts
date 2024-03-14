import express from "express";
import * as Controller from "../controllers/booksController";
import multer from "multer";
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});
router
  .route("/")
  .get(Controller.getAllBooks)
  .post(upload.array("files", 2), Controller.addBook);
router.route("/:bookId").get(Controller.getBook);

export default router;
