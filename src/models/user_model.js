import { Schema, model } from'mongoose';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';



const userSchema = new Schema({

    id: { 
         type: String,
         unique: true 
    },

    fullName: {
        type: String, 
        default: ""
    },

    email: { 
        type: String, 
        unique: true,
        required: [true,"Email is required"]
       },

    password: {
         type: String,
         required: [true,"Password is required"]
    },

    phoneNumber: {
         type: String,
         default: "" 
    },

    address: {
        type: String, 
        default: "" 
    },

    city: { 
        type: String,
        default: ""
    },

    state: {
        type: String,
        default: "" 
    },

    profileProgress: { 
        type: Number, 
        default: 0
     },

    updatedOn: {
         type: Date 
      },

    createdOn: {
         type: Date
     }
});




// * yah pre Save Hone se pahle call Hota
userSchema.pre('save', function(next) {
    this.id = uuidv4();
    this.updatedOn = new Date();
    this.createdOn = new Date();

    //* Hash the password
    const salt = bcrypt.genSaltSync(10); 
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    next();
});




// * yah pre Save Hone se pahle call Hota
userSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
    const update = this.getUpdate();
    delete update._id;
    delete update.id;

    this.updatedOn = new Date();

    next();
});

const UserModel = model('User',userSchema);


//! module.exports = UserModel;


export default UserModel;