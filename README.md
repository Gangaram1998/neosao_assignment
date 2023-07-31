##  NEOSAO PVT. LTD. ASSIGNMENT



<!-- <div>
    //     <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
    //     <button type='button' onClick={upload} >upload</button>
    // </div> -->


    <!-- const [file,setFile]=useState()
    const upload=()=>{
        const formData= new FormData()
        formData.append("file",file)
        axios.post("http://localhost:8080/upload",formData)
        .then((res)=>{})
        .catch((err)=>console.log(err))
    } -->


    <Select bg={"white"} fontSize={"18px"} mt={"15px"} fontWeight={600} border={"2px solid #091b33"} color={"#091b33"} _focus={{ border: "2px solid #091b33" }} onChange={handleSelectChange} >
                <option value={""}>Select Tag</option>
                <option value={"mountains"}>Mountains</option>
                <option value={"sea and beaches"}>Sea and Beaches</option>
                <option value={"food"}>Food</option>
                <option value={"city"}>City</option>
                <option value={"landscapes and nature"}>Landscapes and Nature</option>
            </Select>



            <Box className="file-input-container" mt={"25px"}>
            <Input type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                color={"white"}
                bg="#091b33"
                _focus={{ border: "2px solid #091b33" }}
                accept=".jpeg, .png, .gif"
            />
            <Button bg={"white"} fontSize={"18px"} fontWeight={600} border={"2px solid #091b33"} color={"#091b33"} onClick={handleButtonClick} className="custom-button">Choose File</Button>
        </Box>