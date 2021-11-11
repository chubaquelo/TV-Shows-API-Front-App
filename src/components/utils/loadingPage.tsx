import React from 'react'
import { Center, Spinner, VStack, Text } from '@chakra-ui/react';

const LoadingPage = () => {
  return (
    <Center width={'full'} heigth={'100vh'}>
      <VStack spacing={5}>
        <Text fontSize={'lg'}>Loading, please wait...</Text>
        <Spinner size='xl' />
      </VStack>
    </Center>
  );
}

export default LoadingPage;
