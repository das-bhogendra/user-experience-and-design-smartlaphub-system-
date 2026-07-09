import express from "express";
import {
  listProducts,
  removeProduct,
  singleProduct,
  addProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", adminAuth, removeProduct);
// Public GET for product details: /api/product/single/:id
productRouter.get("/single/:id", singleProduct);

// TEMP test route to verify router is mounted
productRouter.get("/test", (req, res) => {
  return res.status(200).json({ success: true, message: "TEST ROUTE HIT" });
});


// Admin routes (legacy/optional)
// Note: Do NOT protect this route; frontend is using GET for product details.
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
