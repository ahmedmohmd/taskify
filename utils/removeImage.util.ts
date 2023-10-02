import fs from "fs";
import path from "path";

const removeImage = (file: { filename: string }) => {
  const imagePath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    file.filename
  );

  fs.unlinkSync(imagePath);
};

export default removeImage;
