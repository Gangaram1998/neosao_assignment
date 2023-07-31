import React, { useEffect, useState } from 'react'
import {  Button, Grid, Text } from "@chakra-ui/react"
import { InputBox } from '../Components/InputBox'
import { NavigationBar } from '../Components/NavigationBar'
import { ImageCard } from '../Components/ImageCard'
import { UploadImageComp } from '../Components/UploadImageComp'
import { useLocation, useSearchParams } from 'react-router-dom'
import Pagination from '../Components/Pagination'


export const Home = () => {
    const [showuploadimgComp, setShowuploadimgComp]=useState(false);
    const [searchParams,setSearchParams]= useSearchParams()
    const [query,setQuery]= useState(searchParams.get('query') || "")
    const [data,setData]= useState([])
    const [page,setPage] = useState(Number(searchParams.get("page")) || 1)
    const [total,setTotal] =useState(0)

useEffect(()=>{
    let params={
        query,
        page
    }
    setSearchParams(params)
},[query,page])

    useEffect(()=>{
        fetch(`http://localhost:8080/?query=${query}&page=${page}`)
        .then((res)=>res.json())
        .then((res)=>{setData(res.data);console.log(res);setTotal(res.Total)})
        .catch((err)=>console.log(err))
    },[query,page])
    

    

    return (
        <>
            <Text fontSize={"35px"} marginTop={"50px"} color={"#091b33"} fontWeight={700}>Image Search & Upload App</Text>
            <InputBox setQuery={setQuery} />
            <NavigationBar setQuery={setQuery} />
            <Grid gap={8} templateColumns={{md:'repeat(2, 1fr)',lg:'repeat(3, 1fr)',xl:'repeat(4, 1fr)'}} mt={"50px"} maxW={{base:"260px",sm:"280px",md:"650px",lg:"950px",xl:"1250px"}}  mx="auto" justifyItems={"center"} alignItems={"center"}>
                {
                    data?.length>0 && data.map((el,i)=><ImageCard key={i} image={el.image}  />)
                }
            </Grid>
            <Button width={"100px"} color={"white"} bgColor={"#091b33"} borderRadius={"3px"} position={"fixed"} right={{base:1,md:2,lg:2}} bottom={{base:25,md:40,lg:40}} zIndex={1} fontSize={"18px"} onClick={()=>setShowuploadimgComp(true)}
                _hover={{bg:"#091b33",border:"1px solid #091b33",color:"white",cursor:"pointer"}}
            >Upload</Button>
            <Pagination page={page} setPage={setPage} total={total}/>
            {showuploadimgComp && <UploadImageComp setShowuploadimgComp={setShowuploadimgComp}/>}
        </>
    )
}
