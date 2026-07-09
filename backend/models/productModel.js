import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: Array,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    required: true,
  },

  processor: {
    type: String,
    required: true,
  },

  ram: {
    type: String,
    required: true,
  },

  storage: {
    type: String,
    required: true,
  },

  graphics: {
    type: String,
    default: "",
  },

  screenSize: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
    default: 0,
  },

  bestseller: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Number,
    required: true,
  },


});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
