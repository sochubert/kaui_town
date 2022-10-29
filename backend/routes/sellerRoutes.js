import express from "express";
const router = express.Router();
import {
  getSeller,
  getSellerById,
  addSeller,
  deleteSeller,
} from "../controllers/sellerController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getSeller).post(protect, admin, addSeller);
router.route("/:id").get(getSellerById).delete(deleteSeller);

export default router;
