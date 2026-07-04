import multer from "multer";

const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

export const upload = (req, res, next) => {
  multerUpload.single("resume")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: "File Upload Error",
        error: err.message,
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
