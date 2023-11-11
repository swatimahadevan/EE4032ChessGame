import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import LOGO from '../images/crypto_chess_logo.png';

const Navbar = () => {
  return (
    <Box bg="#3182CE" p={4} color="white">
      <Flex align="center" justify="space-between">
        <Heading as="h1" size="lg">
        <img src={LOGO} alt="logo" style={{ maxHeight: '50px' }} height="100%" />
        </Heading>
        <Stack direction="row" spacing={4}>
          <Link to="/EE4032ChessGame/">
            <Button colorScheme="whiteAlpha">Home</Button>
          </Link>
          <Link to="/EE4032ChessGame/aboutus">
            <Button colorScheme="whiteAlpha">About Us</Button>
          </Link>
          <Link to="/EE4032ChessGame/profile">
            <Button colorScheme="whiteAlpha">Profile</Button>
          </Link>
          <Link to="/EE4032ChessGame/bidding">
            <Button colorScheme="whiteAlpha">Play Chess</Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
