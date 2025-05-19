const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const UserModel = require("../models/user.model");

exports.userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const findUser = await UserModel.findOne({ email });

        if (findUser) {
            return sendErrorResponse(res, "User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10) 

        const newUser = new UserModel({ name, email, password: hashedPassword });
        
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
        });
        return sendSuccessResponse(res, { token }, 201);
    } catch (err) {
        return sendErrorResponse(res, err.message, 500);
    }
};

exports.userLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const findUser = await UserModel.findOne({ email });
        if(!findUser){
            return sendErrorResponse(res, "User doesn't exists", 400);
        }
        const isMatch = await bcrypt.compare(password, findUser.password);
        if(!isMatch){
            return sendErrorResponse(res, "Invalid credentials", 400);
        }
        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        return sendSuccessResponse(res, { token }, 200);
    }
    catch(err){
        return sendErrorResponse(res, err.message, 500);
    }
}