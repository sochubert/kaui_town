import mongoose from "mongoose";

const sellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
