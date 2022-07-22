import multer, { diskStorage } from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = async () => {
  new GridFsStorage({
    url: process.env.MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];

      if (match.indexOf(file.mimetype) === -1) {
        const filename = `123`;
        return filename;
      }
      return {
        bucketName: "photos",
        filename: `${Date.now()}-${file.originalname}`,
      };
    },
  });
};

const upload = multer({
  storage: diskStorage(storage),
});

export default upload;
