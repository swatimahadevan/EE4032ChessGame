import {
    Flex,
    Heading,
    useColorModeValue,
    VStack,
  } from '@chakra-ui/react';
  import Cookies from 'js-cookie';
  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  export default function Matching() {
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [matchedUsers, setMatchedUsers] = useState([]);
    const navigate = useNavigate();
  
    const getUsersFromCookies = () => {
      const userData = Cookies.get('userAddress');
      return userData;
    };
  
    const handleButtonClick = () => {
      const currentUser = getUsersFromCookies();
  
      if (!currentUser) {
        // Handle the case where the current user is not found in cookies
        return;
      }
  
      // Match users logic
      const userQueue = getUserQueueFromCookies();
  
      if (userQueue.length < 2) {
        // Not enough users in the queue to match
        return;
      }
  
      const [user1, user2] = userQueue;
  
      // Remove the matched users from the queue
      setUserQueueInCookies(userQueue.slice(2));
  
      // Set the matched users in state
      setMatchedUsers([user1, user2]);
  
      // Redirect to the ChessGame page with matched users in state
      navigate('/chessgame', { state: { user1, user2 } });
    };
  
    const getUserQueueFromCookies = () => {
      const userQueueData = Cookies.get('userQueue');
      return userQueueData ? JSON.parse(userQueueData) : [];
    };
  
    const setUserQueueInCookies = (userQueue) => {
      Cookies.set('userQueue', JSON.stringify(userQueue));
    };
  
    return (
      <>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          py={12}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <VStack>
            <Heading>Click the Button to get Matched</Heading>
            <button onClick={handleButtonClick}>Match Users</button>
          </VStack>
        </Flex>
      </>
    );
  }
  