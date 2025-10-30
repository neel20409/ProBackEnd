import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name: PROCESS.ENV.COUDINARY_CLOUD_NAME, 
        api_key:  PROCESS.ENV.COUDINARY_API_KEY, 
        api_secret:  PROCESS.ENV.COUDINARY_API_SECRET
    });
    
const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if (!localFilePath) return null;
            
      response = await cloudinary.uploder.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("File Uploaded Successfully On cloudinary",response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}
export {uploadOnCloudinary}