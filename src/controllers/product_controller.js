import ProductModel from "../models/product_model.js";




const ProductController = {


//TODO: Create createProduct function
createProduct: async function(req, res) {
    try {
        const productData = req.body;
        const newProduct = new ProductModel(productData);
        await newProduct.save();

        return res.status(201).json({ success: true, data: newProduct, message: "Product created!" });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
},



//TODO: Create fetchAllProducts function
fetchAllProducts: async function(req, res) {
    try {
        const products = await ProductModel.find();
        return res.status(200).json({ success: true, data: products });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
},





//TODO: Create fetchProductByCategory function
fetchProductByCategory: async function(req, res) {
    try {
        const categoryId = req.params.id;
        const products = await ProductModel.find({category: categoryId });
        return res.status(200).json({ success: true, data: products });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
}




};




export default ProductController;