import React from 'react'
import {
  ChakraProvider,
  Box,
  Flex,
  Avatar,
  Text,
  Image,
  Center,
} from '@chakra-ui/react'

import { InputGroup, InputLeftAddon, Input } from '@chakra-ui/react'

import Logo from './logo.png'
const App = () => (
  <ChakraProvider resetCSS>
    <Box
      backgroundColor='blackAlpha.500'
      display='flex'
      justifyContent='space-around'
      height='70px'
      alignItems='center'
    >
      <Box height='100px' width='100px'>
        <Image src={Logo} alt='Segun Adebayo' />
      </Box>
      <Flex width='90%' justifyContent='space-around'>
        <Text
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          Events
        </Text>
        <Text
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          Bookings
        </Text>
      </Flex>
    </Box>
    <Center>
      <Box w='50%'>
        <InputGroup>
          <InputLeftAddon>Username</InputLeftAddon>
          <Input />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Password</InputLeftAddon>
          <Input />
        </InputGroup>
      </Box>
    </Center>
  </ChakraProvider>
)
export default App
