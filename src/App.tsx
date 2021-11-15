import React from 'react';
import { Container, Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import SingleShow from './pages/SingleShow';

const App = () => {
  return (
    <Box
      background={
        'radial-gradient(circle at center center, rgba(33,33,33,0),rgb(33,33,33)),repeating-linear-gradient(135deg, rgb(33,33,33) 0px, rgb(33,33,33) 1px,transparent 1px, transparent 4px),repeating-linear-gradient(45deg, rgb(56,56,56) 0px, rgb(56,56,56) 5px,transparent 5px, transparent 6px),linear-gradient(90deg, rgb(33,33,33),rgb(33,33,33));'
      }
    >
      <Container maxW='container.xl' minHeight={'100vh'} paddingTop={14}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/:showId' element={<SingleShow />} />
          <Route path='*' element={<Main />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
