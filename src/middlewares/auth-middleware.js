import jwt from "jsonwebtoken";
import UserModel from "../models/user_model.js";



//! currently not use this function
//TODO Check loggedInUser then routs access   ( you user ko check Karta Hai login hai kya Nahin )
exports.checkUserAuth = async(req,resp,next)=>{    //* <-- Iska kaam hai yah  ( Front end se User ka token bhejega verify karne ka bad yah Route ko access de dega )
    let token 
    const {authorization} = req.headers

    if(authorization && authorization.startsWith("Bearer")){  //* <-- Frontend Sent User token
        
       try {

        //* Get Token from header
         token = authorization.split(' ')[1]
     
        
         //* Verify token
         const {_id} = jwt.verify(token,process.env.JWT_SECRET_KEY)   //* <-- User Token Verify & check
        


         //* Authenticated user send then next
         req.user = await UserModel.findById(_id)  //* <-- Find User Id   or  (select('-password') yah Dene sa password chhodka  sab send karega )
        
         next()
         
       } catch (error) {
        console.log(error)
        resp.json({"status":false,"message":"Unauthorized User"})
       }
    }

    if(!token){
        resp.status(401).json({"status":false,"message":"Unauthorized User No Token"})
    }



}



//! not use this method
// module.exports = checkUserAuth; 