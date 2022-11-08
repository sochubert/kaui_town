import express from "express";
const router = express.Router();
import {
  getCarousels,
  addCarousel,
  deleteCarousel,
} from "../controllers/carouselController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getCarousels).post(protect, admin, addCarousel);
router.route("/:id").delete(protect, admin, deleteCarousel);

export default router;
