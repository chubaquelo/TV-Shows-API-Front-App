import React, { useState, useEffect } from 'react';
import './styles.css';
import { Container, HStack, Spinner, VStack, Text, Center, Alert, AlertIcon, SimpleGrid } from '@chakra-ui/react';
import { IAPIResponseShow } from './core/adapters/IShowsRepository';
import { GetShows } from './core/interactors/GetShows';
import { APIShowsRepository } from './core/repositories/APIShowsRepository';
import ShowCard from './components/showCard/showCard';
import LoadingPage from './components/utils/loadingPage';

const App = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [shows, setShows] = useState<IAPIResponseShow[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('girls');
  const useShows = new GetShows(new APIShowsRepository());

  useEffect(() => {
    setIsLoadingPage(true);
    useShows
      .getShowsByQuery(searchQuery)
      .then(response => {
        setShows(response);
        setIsLoadingPage(false);
      })
      .catch(error => {
        console.error(error);
        setHasError(true);
      });
  }, [searchQuery]);

  return (
    <Container maxW='container.xl' minHeight={'100vh'} paddingTop={10}>
      {isLoadingPage ? (
        <LoadingPage />
      ) : (
        <>
          <Text align={'center'} marginBottom={5} fontSize={'4xl'}>{`Last 10 shows for: '${searchQuery}'`}</Text>
          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={3} wrap={'wrap'}>
            {shows.map(item => (
              <ShowCard key={item.show.id} show={item.show} />
            ))}
          </SimpleGrid>
        </>
      )}
      {hasError && (
        <Alert status='error' position={'fixed'} bottom={0} left={0}>
          <AlertIcon />
          There was an error processing your request
        </Alert>
      )}
    </Container>
  );
}

export default App;
