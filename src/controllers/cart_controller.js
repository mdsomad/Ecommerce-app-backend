import CartModel from "../models/cart_model.js";


const CartController = {



//TODO: Create getCartForUser function
getCartForUser: async function(req, res) {
    try {
        const user = req.params.user;
        const foundCart = await CartModel.findOne({ user: user }).populate("items.product");

        if(!foundCart) {
            return res.status(200).json({ success: true, data: [] });
        }

        return res.status(200).json({ success: true, data: foundCart.items });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
},









//TODO: Create addToCart function
addToCart: async function(req, res) {
    try {
        const { product, user, quantity } = req.body;
        const foundCart = await CartModel.findOne({ user: user });

        //* If cart does not exist
        if(!foundCart) {
            const newCart = new CartModel({ user: user });
            newCart.items.push({
                product: product,
                quantity: quantity
            });

            await newCart.save();
            return res.status(200).json({ success: true, data: newCart, message: "Product added to cart" });
        }

        //* Deleting the item if it already exists
        const deletedItem = await CartModel.findOneAndUpdate(
            { user: user, "items.product": product },
            { $pull: { items: { product: product } } },
            { new: true }
        );


        //* If cart already exists
        const updatedCart = await CartModel.findOneAndUpdate(
            { user: user },
            { $push: { items: { product: product, quantity: quantity } } },
            { new: true }
        ).populate("items.product");
        return res.status(200).json({ success: true, data: updatedCart.items, message: "Product added to cart" });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
},










//TODO: Create removeFromCart function
removeFromCart: async function(req, res) {
    try {
        const { user, product } = req.body;
        const updatedCart = await CartModel.findOneAndUpdate(
            { user: user },
            { $pull: { items: { product: product } } },
            { new: true }
        ).populate("items.product");

        return res.status(200).json({ success: true, data: updatedCart.items, message: "Product removed from cart" });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
}







};



export default CartController;