// src/middlewares/multer.middleware.js

import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/temp')
    },
    filename: function (req, file, cb) {
        // Correct way to extract extension without importing 'path'
        const parts = file.originalname.split('.');
        // Safely get the extension: add a '.' if an extension exists, otherwise empty string
        const extension = parts.length > 1 ? '.' + parts.pop() : '';

        // Create a unique file name using the current timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        // Combine them: fieldname-timestamp.ext
        cb(null, file.fieldname + '-' + uniqueSuffix + extension); 
    }
})

export const upload = multer({storage:storage})