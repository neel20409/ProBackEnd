import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/temp')
    },
    filename: function (req, file, cb) {
    // 1. Get the file extension (e.g., '.jpg')
    const fileExtension = cb(file.originalname); 
    // 2. Create a unique file name using the current timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // 3. Combine them
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
}
})

export const upload = multer({storage:storage})