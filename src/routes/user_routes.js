import express from "express";
import UserController from "../controllers/userController.js";

//* router object
const UserRoutes  = express.Router();


UserRoutes .post("/createAccount",UserController.createAccount);
UserRoutes.post("/signIn", UserController.signIn);



export default UserRoutes;