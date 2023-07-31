import { Box, Button } from '@chakra-ui/react'
import React from 'react'

const Pagination = ({page,setPage,total}) => {
  return (
    <Box mt={"20px"} mb={"20px"}>
        <Button bg={"#091b33"} isDisabled={page<=1} onClick={()=>setPage(prev=>prev-1)} color={"white"}>Prev</Button>
        <Button isDisabled={true}>{page}</Button>
        <Button bg={"#091b33"} onClick={()=>setPage(prev=>prev+1)} isDisabled={page >= Math.ceil(total/10)} color={"white"}>Next</Button>
    </Box>
  )
}

export default Pagination