import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const multerUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, //10 MB
});

export const upload = (req, res, next) => {
  multerUpload.single("resume")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(401).json({
        success: false,
        message: "File Upload Error",
        error: err,
      });
    }
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
};
