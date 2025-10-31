import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js';

export const registerUser = asyncHandler(async (req, res) => {
   //get userdetail from frontend
   //vaildation-not empty fields
   //check if user already exists:username,email
   //check for images
   //cheack for avtar
   //upload them to cloudinary,check avatar
   //create enrty on db
   //remove password and refresh token from response
   //check for user creation success
   //return res
   const{username,fullName,email,password}=req.body
   console.log("email:" ,email);

  if(
   [fullName,email,password,username].some((field)=>field?.trim()==="")
  ){
      throw new ApiError("All fields are required",400);
  }
  const existedUser=  User.findOne({
      $or:[{email},{username}]
   })

   if(existedUser){
      throw new ApiError("User already exists with this email or username",409);
   }  
   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if (!avatarLocalPath) {
      throw new ApiError("Avatar image is required", 400);
   }
  const avatar= await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  
  if(!avatarLocalPath){
     throw new ApiError("Avatar image is required", 400);
  }

 const user =  await User.create({
                  fullName,
                  avatar:avatar.url,
                  coverImage:coverImage?.url || "",
                  email,password,
                  username:username.toLowercase(),
  })

  const createdUser =  await User.findById(user._id).select(
       "-password -refreshToken"
  )
   if(!createdUser){
      throw new ApiError("User registration failed",500);
   }

   return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered successfully")
   )




})