import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

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
  Checkbox,
  Flex,
  HStack,
  useColorModeValue,

  




} from '@chakra-ui/react'


function Login() {
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === ''

  const handleLogin = async () => {
    try {

      const allUsers = await Axios.get("https://project-2-backend-ten.vercel.app/users").then((e) => {
        console.log(e.data);
        const arr = e.data;
        var len = 0;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i]._id === input && arr[i].password === password) {
            navigate('/Home',{ state: { username: input } });
          }
          else if(arr[i]._id === input && arr[i].password != password){

            alert("Incorrect Password");
          }
          else{
            len = len +1;
          }
        }
        if(len === arr.length){
          alert("Incorrect Username or Password");
        }

      });
    } catch (e) {
      console.log(e);
    }

  }

  const [showPassword, setShowPassword] = useState(false);


  return (
    <>

      <ChakraProvider>
        <Flex minH={"100vh"} justify={"center"} align={"center"}>
        <Box>
          <Center>
            <Box boxShadow='dark-lg' p='0' rounded='md' bg='white' mt={0}>
              <Card maxW='sm'>

                <CardBody mt={0}>
                  <Center>
                    <Image
                      src='https://static.vecteezy.com/system/resources/previews/020/336/393/original/tvs-logo-tvs-icon-transparent-png-free-vector.jpg'
                      alt='Tvs Logo'
                      borderRadius='lg'
                      height='300px'
                    />
                  </Center>
                  <Center>
                    <Stack mt='0' spacing='3'>

                      <Center><Heading size='md'>Welcome to TVSM</Heading></Center>
                      <Center></Center>

                      <FormControl isRequired isInvalid={isError}>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' value={input} onChange={handleInputChange} />
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
                          onChange={(e) => setPassword(e.target.value)}
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
                      Login
                    </Button>
                    <Text as='u'>Dont have an account? <Link to='/SignUp'>SignUp</Link></Text>
                  </ButtonGroup>
                </CardFooter>



              </Card>
            </Box>
          </Center>
        </Box>

        </Flex>
      </ChakraProvider>
    </>
  );
}

export default Login;
