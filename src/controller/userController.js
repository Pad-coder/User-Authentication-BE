import userModel from "../model/userModel.js";
import hash from '../encyption/hash.js'
import jwt from "../encyption/jwt.js";
import { sendEmail } from "../helper/sendEmail.js";


const signup= async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: "Please fill in all fields"});
        }
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
       
        const existingEmail = await userModel.findOne({email});
        if(existingEmail){
            return res.status(400).json({error:"Email already exists"});
        }
        if(password.length < 6){
            return res.status(400).json({error:"Password must be at least 6 characters long"});
        }
        const hashedpassword = await hash.hashPassword(password)
        const user = new userModel({
            email,
            password:hashedpassword

        })
        if(user){
            let token = jwt.createToken(user._id,res);
            await user.save()

            res.status(201).json({message:"User created successfully",
                email:user.email,
                token})
        }else{
            res.status(400).json({error:"Failed to create user"})
        }

    }catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            error: "Intrenal Server Error"
        })
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please enter both email and password"})
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid email"})
        }
        const isValidPassword = await hash.hashCompare(password,user?.password || "");

        if(!user || !isValidPassword){
            return res.status(400).json({error:"Invalid username and password"})
            }
            
           let token = jwt.createToken(user._id,res)

           res.status(200).json({message:"Login successfull",
            _id:user._id,
            email:user.email,
            token
            
        })
    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({
            error: "Intrenal Server Error"
        })
    }
}

const forgotPassword = async(req,res)=>{
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(404).send('User not found');
        }
      
        // Generate random string
        const verificationCode = Math.floor(10000000 + Math.random() * 90000000).toString();
      
        user.verificationCode = verificationCode;
        await user.save();
        
        await sendEmail(email, 'Password Reset Verification Code', `Your password reset code is: ${verificationCode}`);
      
        res.status(200).json({ message: 'Verification code sent to email' });
        
    } catch (error) {
        console.log("Error in Forgot password controller", error.message);
        res.status(500).json({
            error: "Intrenal Server Error"
        })
    }
}

const verifyCode = async(req,res)=>{
    try {
        const { email, verificationCode, newPassword } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if verification code matches
        if (user.verificationCode !== verificationCode) {
          return res.status(400).json({ message: 'Invalid verification code' });
        }
        const hashedpassword = await hash.hashPassword(newPassword)

         user.password = hashedpassword;
         user.verificationCode = null;
         await user.save();

         res.send('Password has been reset successfully');
    } catch (error) {
        console.log("error in verify token controller", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export default {
    signup,
    login,
    forgotPassword,
    verifyCode
}