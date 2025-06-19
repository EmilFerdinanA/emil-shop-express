import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/images"),
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    const uniqueName = Date.now() + "-" + cleanName;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const allowedExtensions = [".jpeg", ".jpg", ".png", ".webp"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(null, false);
  }

  if (
    !allowedExtensions.includes(path.extname(file.originalname).toLowerCase())
  ) {
    cb(null, false);
  }

  cb(null, true);
};

const limits = { fileSize: 5 * 1024 * 1024 };

const upload = multer({ storage, fileFilter, limits });
export default upload;
