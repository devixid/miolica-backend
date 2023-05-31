import multer from "multer";

// formating file name & where to store
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb({ error: null, destination: "../../images" });
  },
  filename: (req, file, cb) => {
    const { users_id } = req.body;
    cb({
      error: null,
      filename: `${new Date().getTime}-${users_id}`,
    });
  },
});

// limit file size upload
const limits = {
  fileSize: 1024 * 1024,
};

// filter file
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|WEBP|webp)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Not an image! Please upload only images", 400), false);
  }
  return cb(null, true);
};

// upload single file
export const singleFile = (photoProfile) => (req, res, next) => {
  const upload = multer({
    storage,
    limits,
    fileFilter,
  }).single(photoProfile);

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return next(new Error("Cannot Upload More Than 1 Image", 500));
      }
    }
    if (!err) return next();
    return next(new Error(err, 500));
  });
};
