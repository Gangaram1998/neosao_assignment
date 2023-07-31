import { Box, Button, Flex, Input, Progress, Select, Spinner, Text, useToast } from '@chakra-ui/react'
import { CloseIcon } from "@chakra-ui/icons"
import React, { useRef, useState } from 'react'
import "../styles/uploadimage.css"
import axios from "axios"

export const UploadImageComp = ({ setShowuploadimgComp }) => {
    const fileInputRef = useRef(null);
    const [Loading, setLoading] = useState(true)
    const [show, setShow] = useState(false);
    const [showTag, setShowTag] = useState(false);
    const [file,setFile] = useState(null)
    const [tag,setTag] = useState(null);
    const [showfile,setShowFile] = useState(false);
    const [uploadProgress,setUploadProgress] = useState(0)
    const toast = useToast()
   

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setShowFile(false)

        const fileData = event.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (fileData && allowedTypes.includes(fileData.type)) {
            setShow(false);
        }
        else {
            setShow(true);
            return
        }
        setFile(event.target.files[0]);
        
    }


const handleSelectChange = (e) => {
    setShowTag(false)
    setTag(e.target.value)
}


const handleClick = async (e) => {
    e.preventDefault()
    if(!file || !tag){
        setShowTag(true)
        setShowFile(true)
        return
    }else{
        setShowFile(false)
        setShowTag(false)
    }
    var formData = new FormData()
    formData.append("file",file)
    formData.append("tag",tag)

    const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      };
setLoading(true);
   await  axios.post("http://localhost:8080/upload", formData,config)
   .then((res)=>{
    if(res.status===200){
        setUploadProgress(100)
        toast({
            title:"upload success",
            description:"image uploaded successfully",
            duration:3000,
            status:"success",
            isClosable:true
        })
        setFile("")
        setTag("")
        setShowuploadimgComp(false)
        
    }
    else{
        setUploadProgress(0)
        toast({
            title:"upload failed",
            description:"image upload failed",
            duration:3000,
            status:"error",
            isClosable:true
        })
    }
    setLoading(false);
   })
   .catch((err)=>console.log(err))

}




return (Loading?<Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
    top={"50%"}
    left={"50%"}
    transform={"translate(-50%, -50%)"}
    zIndex={1}
    position={"fixed"}
  />:<Box borderRadius={"10px"} boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" minWidth={"300px"} maxH={"300px"} maxW={"300px"} bg="white" zIndex={1} position={"fixed"} top={"50%"} left={"50%"} transform={"translate(-50%,-50%)"} minHeight={"300px"} padding={"20px"} textAlign={"left"}>
        <Flex>
            <Text color={"#091b33"} fontSize={"18px"} fontWeight={700}>Upload Your Image</Text>
            <CloseIcon fontSize={"16px"} marginLeft={"70px"} marginTop={"10px"} onClick={() => setShowuploadimgComp(false)} />
        </Flex>
        <Box className="file-input-container" mt={"25px"}>
            <Input type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e)=>handleFileChange(e)}
                color={"white"}
                bg="#091b33"
                _focus={{ border: "2px solid #091b33" }}
                accept=".jpeg, .png, .gif"
                name='file'
            />
            <Button bg={"white"} fontSize={"18px"} fontWeight={600} border={"2px solid #091b33"} color={"#091b33"} onClick={handleButtonClick} className="custom-button">Choose File</Button>
        </Box>
        {show && <Text fontSize="13px" color={"red"} mt={"-5px"}>only JPEG PNG GIF files are allowed</Text>}
        {showfile && <Text fontSize="13px" color={"red"} mt={"-5px"}>choose image</Text>}
        <Box>
            <Select bg={"white"} fontSize={"18px"} mt={"15px"} fontWeight={600} border={"2px solid #091b33"} color={"#091b33"} _focus={{ border: "2px solid #091b33" }} onChange={handleSelectChange} >
                <option value={""}>Select Tag</option>
                <option value={"mountains"}>Mountains</option>
                <option value={"sea and beaches"}>Sea and Beaches</option>
                <option value={"food"}>Food</option>
                <option value={"city"}>City</option>
                <option value={"landscapes and nature"}>Landscapes and Nature</option>
            </Select>
            {showTag && <Text fontSize="13px" color={"red"} mt={"-2px"} ml={"10px"}>select tag</Text>}
        </Box>
        {Loading && <Box mt={"10px"}>
            <Progress value={uploadProgress} borderRadius={"5px"} />
        </Box>}
        <Box display={"flex"} justifyContent={"center"} marginTop={"15px"}>
            <Button padding={"10px 100px"}  bg={"#091b33"} color={"white"} _hover={{ bg: "#091b33", border: "none", color: "white" }}
              type='submit'  onClick={handleClick}
            >{Loading ? "Uploading..." : "Upload"}</Button>
        </Box>
    </Box>
)
}
