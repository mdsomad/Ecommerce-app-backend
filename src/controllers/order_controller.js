import OrderModel from "../models/order_model.js";
import CartModel from "../models/cart_model.js";


const OrderController = {

    

    //TODO: Create createOrder function
    createOrder: async function(req, res) {
        
        try {
            const { user, items } = req.body;
            const newOrder = new OrderModel({
                user: user,
                items: items
            });
            await newOrder.save();
            
            //* Update the cart
            await CartModel.findOneAndUpdate(
                { user: user._id },
                { items: [] }
                );

                return res.status(201).json({ success: true, data: newOrder, message: "Order created!" });
            }
            catch(ex) {
              return res.status(500).json({ success: false, message: ex });
        }
    },




//TODO: Create fetchOrdersForUser function 
fetchOrdersForUser: async function(req, res) {

    try {
        const userId = req.params.userId;
        const foundOrders = await OrderModel.find({
            "user._id":userId
        }).sort({ createdOn: -1 });

        return res.status(200).json({ success: true, data: foundOrders });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
},




//TODO: Create updateOrderStatus function
updateOrderStatus: async function(req, res) {
    try {
        const { orderId, status } = req.body;
        const updatedOrder = await OrderModel.findOneAndUpdate(
            { _id: orderId },
            { status: status },
            { new: true }
        );
        return res.status(200).json({ success: true, data: updatedOrder });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }




}

    
    
    
    
    


};



export default OrderController;