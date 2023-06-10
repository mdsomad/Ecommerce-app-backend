import { Schema, model } from'mongoose';




const productSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    title: { type: String, required: [true, 'title is required'] },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    images: { type: Array, default: [] },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});




// * yah pre Save Hone se pahle call Hota
productSchema.pre('save', function(next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();
    next();
});




// * yah pre Save Hone se pahle call Hota
productSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
    const update = this.getUpdate();
    delete update._id;
    this.updatedOn = new Date();
    next();
});



const ProductModel  = model('Product',productSchema);





export default ProductModel ;