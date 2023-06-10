import express from "express";
import CartController from "../controllers/cart_controller.js";


const CartRoutes = express.Router();



CartRoutes.get("/:user", CartController.getCartForUser);
CartRoutes.post("/", CartController.addToCart);
CartRoutes.delete("/", CartController.removeFromCart);


export default CartRoutes;

