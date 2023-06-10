import { Schema, model } from'mongoose';




const categorySchema = new Schema({
    title: { type: String, required: [true, 'title is required'] },
    description: { type: String, default: "" },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});




// * yah pre Save Hone se pahle call Hota
categorySchema.pre('save', function(next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();
    next();
});




// * yah pre Save Hone se pahle call Hota
categorySchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
    const update = this.getUpdate();
    delete update._id;
    this.updatedOn = new Date();
    next();
});



const CategoryModel = model('Category',categorySchema);



//! module.exports = CategoryModel;

export default CategoryModel;