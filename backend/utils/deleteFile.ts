import fs from "fs";
import createError from "../utils/errorCreate";
const deleteFile = (filePath: string) => {
  try {
    fs.unlinkSync(filePath);
    console.log("File is deleted.");
  } catch (err) {
    const error = err as Error;
    createError.createError(
      500,
      "Failed",
      error.message || "Internal Server Error for deleting file"
    );
  }
};
export default deleteFile;
