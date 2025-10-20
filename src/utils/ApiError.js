import { Error } from "mongoose"

class ApiError extends Error {
    constructor(
        statusCode,
        message="Somthing Went Wrong",
        errors=[],
        statck=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.success = false
        this.message
        this.errors=errors

        if(statck){
            this.stack=statck
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}
export {ApiError}