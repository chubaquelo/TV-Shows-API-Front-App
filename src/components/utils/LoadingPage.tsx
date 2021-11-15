import React from 'react'
import { Center, Spinner, VStack, Text } from '@chakra-ui/react';

const LoadingPage = () => {
  return (
    <Center width={'full'} heigth={'100vh'}>
      <VStack spacing={5}>
        <Text fontSize={'lg'} color={'white'}>Loading, please wait...</Text>
        <Spinner color={'white'} size='xl' />
      </VStack>
    </Center>
  );
}

export default LoadingPage;
