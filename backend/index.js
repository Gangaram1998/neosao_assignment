const express = require('express');
const { connection } = require('./db.js');
const cors = require('cors');
require('dotenv').config()
const multer= require('multer');
const { ImageModel } = require('./models/imageModel.js');
const { uploadRouter } = require('./routes/uploadRoutes.js');

// creating application
const app = express();

app.use(express.json());
app.use(cors())

// const storage =multer.diskStorage({
//     destination:function(req,file,cb){
//         return cb(null,"./public/images")
//     },
//     filename:function(req,file,cb){
//         return cb(null,`${Date.now()}_${file.originalname}`)
//     }
// })

// const fileFilter = function(req,file,cb){
//     const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

//     if(allowedTypes.includes(file.mimetype)){
//         cb(null,true)
//     }
//     else{
//         cb(null,false)
//     }
// }

// const upload = multer({
//     storage,
//     fileFilter
// })


// app.get("/",async(req,res)=>{
//     try{
//         const images = await ImageModel.findById({}).sort({createdAt:"descending"})
//     }catch(err){
//         res.send({
//             message: "something went wrong",
//             error: err.message,
//             err:true,
//             status:400
//         })
//     }
// })

// app.use("/upload",upload.single("file"),async(req,res)=>{
//     const {filename}= req.file;
//     const {tag}= req.body;
//     if(!filename || !tag){
//         return res.send({
//             message: "File not found",
//             status: 404,
//             error:true,
//             error
//         })
//     }

//     try{
//         const data = new ImageModel({
//             image:filename,
//             tag:tag
//         })
//         await data.save()
//         res.send({
//             message:"Image saved successfully",
//             error:false,
//             status:200,
//             data:data
//         })
//     }catch(err){
//         res.send({
//             message:"something went wrong",
//             status:400,
//             err,
//             error:true
//         })
//     }
// })
app.use(express.static("public"))
app.use("/",uploadRouter)



app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`server is connected to the database and running at ${process.env.PORT}`)
    }catch(e){
        console.log(e)
    }
})