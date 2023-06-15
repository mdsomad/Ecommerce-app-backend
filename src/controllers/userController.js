import UserModel from "../models/user_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const UserController = {




//TODO: Create createAccount Function
createAccount: async function(req, res) {

    console.log(req.body)
    
    try {
        const userData = req.body;
        const newUser = new UserModel(userData);
        await newUser.save();


        const saved_user = await UserModel.findOne({email:userData.email})   //* <-- User Find Database
        
       
        //* generate JWT token        user id            SECRET_KEY               token expiry time
        const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:"30d"});
        
         
        return res.status(201).json({success: true,token: token, data: newUser, message: "User created!" });
        
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }
},





//TODO  Create User signIn function 
signIn: async function(req, res) {


    try {

        const { email, password } = req.body;
        
        
        const foundUser = await UserModel.findOne({email:email});   //* <-- Single user find


        if(!foundUser) {
            return res.json({ success: false, message: "User not found!" });
        }
         

        //* Server Store Password Our compare User Provide Password
        const passwordsMatch = bcrypt.compareSync(password,foundUser.password);

        if(!passwordsMatch) {
            return res.json({ success: false, message: "Incorrect password!" });
         }


         
        //* generate JWT token
        const token = jwt.sign({userID:foundUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"30d"});

        return res.status(200).json({ success: true,token: token, data: foundUser });
    }
    catch(ex) {
        return res.json({ success: false, message: ex });
    }

},
    
    



//TODO  Create User updateUser function 
updateUser: async function(req, res) {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            updateData,
            { new: true }
        );

        if(!updatedUser) {
            throw "user not found!";
        }

        return res.json({ success: true, data: updatedUser, message: "User updated!" });
    }
    catch(ex) {
        return res.json({ success: false, message: ex });
    }
}






    


}





    





  export default UserController;