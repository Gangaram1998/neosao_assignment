const express = require('express');
const { PostController, GetController } = require('../controllers/uploadcontrollers');
const { upload } = require('../middleware/multer');

const uploadRouter= express.Router();

uploadRouter.post("/upload",upload.single("file"),PostController)
uploadRouter.get("/",GetController)

module.exports={
    uploadRouter
}