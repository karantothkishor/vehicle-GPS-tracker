import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import {

    Box,
    Card,
    Image,
    Stack,
    Heading,
    Button,
    CardBody,
    CardFooter,
    ChakraProvider,
    Center,
    Input,
    InputLeftAddon,
    InputGroup,
    InputRightElement,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Divider,
    Text,
    ButtonGroup,
    Alert
} from '@chakra-ui/react';

export const SignUp = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    const [input, setInput] = useState('')
    const handleInputChange = (e) => {
        setInput(e.target.value);
    }
    const isError = input === ''
  
    const handleLogin = () => {
        if(password===repassword && input!="" ){
          Axios.get("https://project-2-backend-ten.vercel.app/users").then((response)=>{
            console.log(response.data);
            for(var i=0;i<response.data.length;i++){
              if(input===response.data[i]._id){
                alert("Username Already exist");
                break;
              }
            }
          })
          Axios.post("https://project-2-backend-ten.vercel.app/signup",{username:input,password:password}).then((e)=>{
                console.log(e);
            })
            navigate("/")
        }else{
            alert("Password and Re-Enter Password doesn't match");
        }
      
      
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleRePassword = (e)=>{
        setRePassword(e.target.value);
    }

    // for username and password
    const [password,setPassword] = useState('');
    const [repassword,setRePassword] = useState('');

 

    return (
        <>
            <ChakraProvider>
      <Box bgColor='grey' h='717px'>
        <Center>
          <Box boxShadow='dark-lg' p='0' rounded='md' bg='white'mt={10} >
            <Card maxW='sm'>

              <CardBody mt={0}>
                <Center>
                <Image 
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhMZxaknowE4DkGwaUx-kpyrcIGbVkJxTSA&usqp=CAU'
                  alt='Tvs Logo'
                  borderRadius='lg'
                />
                </Center>
                <Center>
                  <Stack mt='0' spacing='3'>

                    <Center><Heading size='md'>Welcome to TVSM</Heading></Center>
                    <Center></Center>

                    <FormControl isRequired isInvalid={isError}>
                      <FormLabel>Username</FormLabel>
                      <Input placeholder='Enter Username' type='text' value={input} onChange={handleInputChange} />
                      {!isError ? (
                        <FormHelperText></FormHelperText>
                      ) : (
                        <FormErrorMessage>Username is required.</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        onChange={handlePassword}
                      />
                      
                    </InputGroup>
                    <FormLabel>Re-Enter Password</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        onChange={handleRePassword}
                      />
                      <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                        
                  </Stack>
                </Center>
              </CardBody>
            
                <CardFooter>
                  <ButtonGroup spacing='5'>
                    <Button ml={9} variant='solid' colorScheme='blue' onClick={handleLogin} >
                      SignUp
                    </Button>
                    <Text as='u'>Already have an account? <Link to='/'>Login</Link></Text>
                    </ButtonGroup>
                </CardFooter>
                
                    
              
            </Card>
          </Box>
        </Center>
      </Box>

    </ChakraProvider>
        </>
    )
}
