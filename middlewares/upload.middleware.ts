import multer from "multer";
import path from "path";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (_: any, __: any, done: any) {
    done(null, path.join(__dirname, "..", "public", "images"));
  },

  filename: function (_: any, file: any, done: any) {
    const suffix = Date.now();

    done(null, `${suffix}-${file.originalname}`);
  },
});

const fileFilter = (
  _: any,
  file: {
    mimetype: string;
    filename: string;
  },
  done: any
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    done(null, true);
  } else {
    done(
      new Error(
        "Unsupported file format. Please upload a valid file (.jpeg., .jpg, .png)."
      ),
      false
    );
  }
};

const multerOptions = {
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },
};

const upload = multer(multerOptions);

export default upload;
