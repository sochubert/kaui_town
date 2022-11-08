import mongoose from "mongoose";

const carouselSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Carousel = mongoose.model("Carousel", carouselSchema);

export default Carousel;
