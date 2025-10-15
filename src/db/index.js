import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try {
     const connectioninstance=  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     console.log(`MongoDb Connected ${connectioninstance.connection.host}`);
     

    } catch (error) {
        console.log(" mongo db conncetion error",error);
        process.exit(1)
        
    }
}
export default connectDB