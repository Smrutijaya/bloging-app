import User from '../model/user.js'; // Ensure the path and file extension are correct
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while fetching users" });
    }

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while checking for existing user" });
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password : hashedPassword,
    });
   

    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while saving the user" });
    }

    return res.status(201).json({ user });
}


export const login = async (req,res,next)=>{
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return  console.log(err);

    }

    if (!existingUser) {
        return res
        .status(400)
        .json({ message: "Could not find user by this Email" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res
        .status(400)
        .json({massage: "Incorrect Password"})
        

    }
    return res
    .status(200)
    .json({masssage: "Login Succesful"})
}