import React, { useState, useEffect } from 'react';
import { Container, HStack, Spinner, VStack, Text, Center, Alert, AlertIcon, SimpleGrid } from '@chakra-ui/react';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main';
import SingleShow from './pages/SingleShow';

const App = () => {
  return (
    <Container maxW='container.xl' minHeight={'100vh'} paddingTop={10}>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:showId' element={<SingleShow />} />
        <Route path='*' element={<Main />} />
      </Routes>
    </Container>
  );
};

export default App;
