import express from "express";
import OrderController   from "../controllers/order_controller.js";


const OrderRoutes = express.Router();


OrderRoutes.get("/:userId", OrderController.fetchOrdersForUser);
OrderRoutes.post("/", OrderController.createOrder);
OrderRoutes.put("/updateStatus", OrderController.updateOrderStatus);


export default OrderRoutes;