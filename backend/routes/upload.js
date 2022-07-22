import express from "express";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  if (req.file === undefined) {
    return res.send("you must select a file");
  }
  const imgUrl = `http://localhost:5001/${req.file.filename}`;
  return res.send(imgUrl);
});

export default router;
