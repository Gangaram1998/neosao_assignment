import { Box, Button, Image } from '@chakra-ui/react'
import {DownloadIcon} from "@chakra-ui/icons"
import React, { useState } from 'react'
import {saveAs} from "file-saver"

export const ImageCard = ({image}) => {
    console.log(image)
    const [showDownloadIcon, setshowDownloadIcon]=useState(false)
    const handleMouseOver=()=>{
        setshowDownloadIcon(true);
    }

    const handleMouseLeave = ()=>{
        setshowDownloadIcon(false);
    }

    const handleDownload = () => {
        fetch(`http://localhost:8080/images/${image}`)
        .then(res=>res.blob())
        .then((blob)=>saveAs(blob,"image.jpg"))
    }
  return (
    <Box position={"relative"}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
    >
        <Image width={"100%"} height={"100%"} src={`http://localhost:8080/images/${image}`} alt='Image'/>
        <Box position={"absolute"} zIndex={1} bottom={2} left={5}  display={showDownloadIcon?"flex":"none"} justifyContent={"center"} alignItems={"center"} padding={"4px"} border={"1px solid white"} onClick={handleDownload} _hover={{bg:"white",border:"1px solid black",cursor:"pointer"}} ><DownloadIcon  color={"white"} _hover={{color:"black"}} /></Box>
    </Box>
  )
}
