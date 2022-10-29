import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Seller from "../models/sellerModel.js";

// @desc Get all seller
// @route GET /api/seller
// @access Private
const getSeller = asyncHandler(async (req, res) => {
  const sellers = await Seller.find({});
  res.json(sellers);
});

// @desc Get seller by ID
// @route GET /api/seller/:id
// @access Private
const getSellerById = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id);

  if (seller) {
    res.json(seller);
  } else {
    res.status(404);
    throw new Error("Seller not found.");
  }
});

// @desc Create new seller
// @route POST /api/seller
// @access Private
const addSeller = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body;

  const seller = new Seller({
    name,
    image,
    description,
  });

  const createdSeller = await seller.save();

  res.status(201).json(createdSeller);
});

// @desc Delete seller
// @route DELETE /api/seller/:id
// @access Private
const deleteSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id);

  if (seller) {
    await seller.remove();
    res.json({ message: "Seller removed" });
  } else {
    res.status(404);
    throw new Error("Seller not found.");
  }
});

export { getSeller, getSellerById, addSeller, deleteSeller };
