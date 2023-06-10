import express from "express";
import ProductController from "../controllers/product_controller.js";

const ProductRoutes = express.Router();


ProductRoutes.get("/", ProductController.fetchAllProducts);
ProductRoutes.get("/category/:id", ProductController.fetchProductByCategory);
ProductRoutes.post("/", ProductController.createProduct);




export default ProductRoutes