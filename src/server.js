
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";;
import helmet from'helmet';
import morgan from "morgan"
import core from 'cors';
import colors from 'colors';
import connectDB from './config/db.js';



//* configure env
dotenv.config();


//* databse config
connectDB();




//* Using Middlewares
const app = express();

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));       //* <-- Api hit detail Terminal Mein show karta hai
app.use(core())







import UserRoutes  from './routes/user_routes.js';
app.use("/api/user",UserRoutes);


import CategoryRoutes from './routes/category_routes.js';
app.use("/api/category",CategoryRoutes);


import ProductRoutes from './routes/product_routes.js';
app.use("/api/product",ProductRoutes);



import CartRoutes from './routes/cart_routes.js';
app.use("/api/cart",CartRoutes);


import OrderRoutes from './routes/order_routes.js';
app.use("/api/order",OrderRoutes);






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`.bgCyan.bgGreen);
});


