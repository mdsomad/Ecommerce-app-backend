
import UserModel from "../models/user_model.js";
import bcrypt from 'bcrypt';


const UserController = {




//TODO: Create createAccount Function
createAccount: async function(req, res) {

    console.log(req.body)
    
    try {
        const userData = req.body;
        const newUser = new UserModel(userData);
        await newUser.save();

        return res.status(201).json({success: true, data: newUser, message: "User created!" });
        
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
            return res.status(404).json({ success: false, message: "User not found!" });
        }
         

        //* Server Store Password Our compare User Provide Password
        const passwordsMatch = bcrypt.compareSync(password,foundUser.password);

        if(!passwordsMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password!" });
         }

        return res.status(200).json({ success: true, data: foundUser });
    }
    catch(ex) {
        return res.status(500).json({ success: false, message: ex });
    }

},
    
    
    
    


}





    





  export default UserController;