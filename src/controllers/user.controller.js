import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'; // Corrected import to named import
import {User} from '../models/user.model.js'; // Corrected import to named import
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'; // Corrected import to default import

// Note: Ensure ApiError.js and user.model.js are exporting correctly with 'export { ApiError }' and 'export const User'.
// The corrected import lines above assume 'export default' was intended for ApiResponse, and named exports for the others.

export const registerUser = asyncHandler(async (req, res) => {
   const{username,fullName,email,password}=req.body
   console.log("email:" ,email);

  if(
   [fullName,email,password,username].some((field)=>field?.trim()==="")
  ){
      throw new ApiError("All fields are required",400);
  }
  
  // *** CORRECTION A: Added 'await' for existence check ***
  const existedUser = await User.findOne({
      $or:[{email},{username}]
   })

   if(existedUser){
      throw new ApiError("User already exists with this email or username",409);
   }  
   
   const avatarLocalPath = req.files?.avatar?.[0]?.path
   const coverImageLocalPath = req.files?.coverImage?.[0]?.path

   if (!avatarLocalPath) {
      throw new ApiError("Avatar image is required", 400);
   }
   
   const avatar= await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  
  // *** CORRECTION B: Check if avatar upload was successful ***
  // Also removed the redundant and incorrect second avatarLocalPath check.
   if(!avatar){
      throw new ApiError("Avatar file upload failed, please try again", 500);
   }

   const user = await User.create({
                  fullName,
                  avatar:avatar.url,
                  coverImage:coverImage?.url || "",
                  email,password,
                  // *** CORRECTION C: Corrected 'toLowercase' to 'toLowerCase' ***
                  username:username.toLowerCase(), 
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