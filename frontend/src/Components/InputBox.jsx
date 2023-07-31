import { Box, Button, Input, Text } from '@chakra-ui/react'
import { Search2Icon, SearchIcon } from "@chakra-ui/icons"
import React, { useEffect, useRef, useState } from 'react'
const suggestions = [
    "Mountains",
    "Sea",
    "Beach",
    "Landscapes",
    "Food",
    "City",
    "Nature"
]

export const InputBox = ({setQuery}) => {

    const [showSuggestions, setShowSuggestions] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef(null)

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setShowSuggestions(true);
    }

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setShowSuggestions(false);
    }

    const handleOutsideClick = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setShowSuggestions(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);


    const handleSearch = () =>{
        console.log(inputValue)
        setQuery(inputValue)
    }

    return (
        <Box>
            <Box
                marginTop={"20px"}
                maxW={"300px"}
                mx={"auto"}
                display={"flex"}
                border={"1px solid #091b33"}
                borderRadius={"5px"}
                _focus={{ borderColor: "blue" }}
            >
                <Input
                    ref={inputRef}
                    border={"none"}
                    value={inputValue}
                    _focus={{
                        border: "transparent",
                        boxShadow: "none"
                    }}
                    placeholder='Serch here'
                    onChange={handleInputChange}
                />
                <Button
                    borderRadius={"none"}
                    borderRightRadius={"3px"}
                    bgColor={"#091b33"}
                    color={"white"}
                    _hover={{ bgColor: "none" }}
                    onClick={handleSearch}
                >
                    <Search2Icon />
                </Button>
            </Box>
            {showSuggestions && <Box
                position="fixed"
                left="50%"
                transform="translateX(-50%)"
                maxW={"300px"}
                minW={"300px"}
                bg={"white"}
                borderRadius="none"
                zIndex={1}
                textAlign={"left"}
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
            >
                {inputValue && <Text paddingLeft={"10px"}>search {inputValue}</Text>}
                {suggestions
                    .filter((suggestion) =>
                        suggestion.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((suggestion, index) => (
                        <>
                            <Text
                                key={index}
                                onClick={() => {handleSuggestionClick(suggestion);setQuery(suggestion)}}
                                cursor="pointer"
                                fontSize={"16px"}
                                fontWeight={500}
                                px="3px"
                                _hover={{ border: "1px solid gray" }}
                                paddingLeft={"20px"}
                              >
                               <SearchIcon  mr={"20px"} fontSize={"12px"}/> {suggestion}
                            </Text>

                        </>
                    ))}

            </Box>}

        </Box>
    )
}
