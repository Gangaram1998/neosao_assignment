const { ImageModel } = require("../models/imageModel");

const PostController = async(req,res)=>{
    const {filename}= req.file;
    const {tag}= req.body;
    if(!filename || !tag){
        return res.send({
            message: "File not found",
            status: 404,
            error:true,
            error
        })
    }

    try{
        const data = new ImageModel({
            image:filename,
            tag:tag
        })
        await data.save()
        res.send({
            message:"Image saved successfully",
            error:false,
            status:200,
            data:data
        })
    }catch(err){
        res.send({
            message:"something went wrong",
            status:400,
            err,
            error:true
        })
    }
}


const GetController =async(req,res) =>{

    const {query} = req.query
    console.log(req.query,41)
    console.log(query,42)
    const queryObj={

    }
    if(query){
        queryObj.tag={$regex:query,$options:"i"}
    }

    try{
        console.log(queryObj)
       const allImages= await ImageModel.find(queryObj); 
       res.send({
        message:"All images",
        status:200,
        error:false,
        data:allImages
       })
    }catch(err){
        res.send({
            message:"something went wrong",
            status:400,
            err,
            error:true
        })
    }
}

module.exports={
    PostController,
    GetController
}