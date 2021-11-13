import React, { useState, useEffect } from 'react';
import { Container, HStack, Spinner, VStack, Text, Center, Alert, AlertIcon, SimpleGrid, Input, Box, FormControl } from '@chakra-ui/react';
import { IAPIResponseShow } from '../core/adapters/IShowsRepository';
import { GetShows } from '../core/interactors/GetShows';
import { APIShowsRepository } from '../core/repositories/APIShowsRepository';
import ShowCard from '../components/showCard/ShowCard';
import LoadingPage from '../components/utils/loadingPage';

const Main = () => {
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

  const onSubmit = (e: any) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      setSearchQuery(e.target.value);
    }
  }

  return (
    <>
      {isLoadingPage ? (
        <LoadingPage />
      ) : (
        <>
          <HStack alignItems={'center'} justifyContent={'space-between'} wrap={'wrap'}>
            <Box width={['100%', '100%', '30%']} paddingBottom={5}>
              <Input width={'90%'} placeholder='Enter a show name here!' size='md' onKeyDown={e => onSubmit(e)} />
            </Box>
            <Box width={['100%', '100%', '50%']}>
              <Text align={['center', 'right']} marginBottom={5} fontSize={['md', 'lg', '2xl', '4xl']}>{`Last 10 shows results for: '${searchQuery}'`}</Text>
            </Box>
          </HStack>
          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={5} wrap={'wrap'} padding={5} border={'1px solid #000'} borderRadius={'4px'}>
            {shows.map(item => (
              <ShowCard key={item.show.id} show={item.show} />
            ))}
            {shows.length === 0 && !hasError && <Text>No shows found :(</Text>}
          </SimpleGrid>
        </>
      )}
      {hasError && (
        <Alert status='error' position={'fixed'} bottom={0} left={0}>
          <AlertIcon />
          There was an error processing your request
        </Alert>
      )}
    </>
  );
}

export default Main;
