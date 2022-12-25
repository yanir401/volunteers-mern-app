import multer from "multer";
const storage = multer.memoryStorage();
// const upload = multer({ storage });
const uploadFileFilter = function fileFilter(req, file, cb) {
  console.log(file);
  console.log(file.path);
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
    return cb(new Error("Please upload an image format jpg/jpeg/png"));

  cb(undefined, true);
};

export const multerMiddleware = multer({
  storage,
  // dest: "eventImages",
  limits: {
    fileSize: 2000000,
  },
  fileFilter: uploadFileFilter,
});
