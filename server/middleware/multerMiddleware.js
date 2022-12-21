import multer from "multer";

const uploadFileFilter = function fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
    return cb(new Error("Please upload an image format jpg/jpeg/png"));

  cb(undefined, true);
};

export const multerMiddleware = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter: uploadFileFilter,
});
