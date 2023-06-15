import CategoryModel from "../models/category_model.js";



const CategoryController = {





// TODO: Create createCategory function
createCategory: async function(req, res) {

    try {
        
        const categoryData = req.body;
        const newCategory = new CategoryModel(categoryData);
        await newCategory.save();

        return res.status(201).json({ success: true, data: newCategory, message: "Category created!" });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
},








// TODO: Create fetchAllCategories function
fetchAllCategories: async function(req, res) {
    try {

        const categories = await CategoryModel.find();
        return res.status(200).json({ success: true, data: categories });

    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
},







//TODO: Create fetchCategoryById function
fetchCategoryById: async function(req, res) {
    try {
        const id = req.params.id;
        const foundCategory = await CategoryModel.findById(id);

        if(!foundCategory) {
            return res.json({ success: false, message: "Category not found!" });
        }

        return res.json({ success: true, data: foundCategory });
    }
    catch(ex) {
        return res.json({ success: false, message: ex });
    }
}







}




export default CategoryController;