const multer= require('multer');

const storage =multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const fileFilter = function(req,file,cb){
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload = multer({
    storage,
    fileFilter
})

module.exports={
    upload
}