import { Button,  Grid } from '@chakra-ui/react'
import React from 'react'


export const NavigationBar = ({setQuery,setSearchParams,query}) => {
    

    const handleMountain=()=>{
        const newQuery = "mountains";
        setQuery(newQuery)
    }
    const handleNature=()=>{
        const newQuery = "landscapes and nature";
        setQuery(newQuery)
    }
    const handleSea=()=>{
        const newQuery = "sea and beaches";
        setQuery(newQuery)
    }
    const handleFood=()=>{
        const newQuery = "food";
        setQuery(newQuery)
    }
    const handleCity=()=>{
        const newQuery = "city";
        setQuery(newQuery)
    }


  return (
    <Grid templateColumns={{base:'repeat(1, 1fr)',sm:'repeat(2, 1fr)',sm:'repeat(3, 1fr)',lg:'repeat(5, 1fr)'}} gap={{base:2,md:6}} minW={"180px"} maxW={"1000px"} mx={"auto"}  mt={"20px"}  alignItems="center" 
     justifyItems="center" 
    >
        <Button onClick={(e)=>handleMountain(e)} width={"180px"} borderRadius={"3px"} bgColor={"#091b33"} color={"white"}  _hover={{bgColor:"none"}}>Mountains</Button>
        <Button onClick={()=>handleSea()} width={"180px"} borderRadius={"3px"} bgColor={"#091b33"} color={"white"}  _hover={{bgColor:"none"}}>Sea and Beaches</Button>
        <Button  onClick={()=>handleFood()} width={"180px"} borderRadius={"3px"} bgColor={"#091b33"} color={"white"}  _hover={{bgColor:"none"}}>Food</Button>
        <Button onClick={()=>handleCity()} width={"180px"} borderRadius={"3px"} bgColor={"#091b33"} color={"white"}  _hover={{bgColor:"none"}}>City</Button>
        <Button onClick={()=>handleNature()} width={"180px"} borderRadius={"3px"} bgColor={"#091b33"} color={"white"}  _hover={{bgColor:"none"}}>Landscapes and Nature</Button>
    </Grid>
  )
}
