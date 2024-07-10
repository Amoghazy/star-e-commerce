import multer from "multer";
import createError from "../utils/errorCreate";
import fs from "fs";
import { Request } from "express";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    if (!fs.existsSync("uploads")) {
      try {
        fs.mkdirSync("uploads");
        cb(null, "uploads");
      } catch (error) {
        cb(error, "uploads");
      }
    } else {
      return cb(null, "uploads");
    }
  },
  filename: function (req: Request, file: any, cb: any) {
    console.log(file);
    const fileName = Date.now() + "-" + file.originalname;

    cb(null, fileName);
  },
});
function fileFilter(req: Request, file: any, cb: any) {
  let type = file.mimetype.split("/")[0];

  if (type == "image") {
    return cb(null, true);
  } else {
    return cb(
      createError.createError(400, "Only image files are allowed"),
      false
    );
  }
}

const upload = multer({ storage, fileFilter });
export default upload;
