import fs from "fs";
import createError from "../utils/errorCreate";
const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    console.log("File is deleted.");
  } catch (err) {
    createError.createError(500, "Failed", err.message);
  }
};
export default deleteFile;
