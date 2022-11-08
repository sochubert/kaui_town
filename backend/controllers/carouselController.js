import asyncHandler from "express-async-handler";
import Carousel from "../models/carouselModel.js";

// @desc Fetch all carousels
// @route GET /api/carousels
// @access Public
const getCarousels = asyncHandler(async (req, res) => {
  const carousels = await Carousel.find({});
  res.json(carousels);
});

// @desc Add a carousel
// @route POST /api/carousels
// @access Private/Admin
const addCarousel = asyncHandler(async (req, res) => {
  const { image, description } = req.body;

  const carousel = new Carousel({
    image,
    description,
  });

  const createdCarousel = await carousel.save();
  res.status(201).json(createdCarousel);
});

// @desc Delete a carousel
// @route DELETE /api/carousels/:id
// @access Private/Admin
const deleteCarousel = asyncHandler(async (req, res) => {
  const carousel = await Carousel.findById(req.params.id);

  if (carousel) {
    await carousel.remove();
    res.json({ message: "Carousel removed" });
  } else {
    res.status(404);
    throw new Error("Carousel not found");
  }
});

export { getCarousels, addCarousel, deleteCarousel };
