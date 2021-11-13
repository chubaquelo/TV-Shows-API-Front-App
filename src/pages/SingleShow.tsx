import React, { useState, useEffect } from 'react';
import {
  Container,
  HStack,
  Spinner,
  VStack,
  Text,
  Center,
  Alert,
  AlertIcon,
  SimpleGrid,
  Box,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Button,
} from '@chakra-ui/react';
import { GetShows } from '../core/interactors/GetShows';
import { APIShowsRepository } from '../core/repositories/APIShowsRepository';
import LoadingPage from '../components/utils/loadingPage';
import { Link, useParams } from 'react-router-dom';
import { Show } from '../core/entities/show';

const SingleShow = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [show, setShow] = useState<Show>();
  const { showId } = useParams();
  const useShows = new GetShows(new APIShowsRepository());

  useEffect(() => {
    setIsLoadingPage(true);
    useShows
      .getShowById(showId)
      .then(response => {
        setShow(response);
        setIsLoadingPage(false);
      })
      .catch(error => {
        console.error(error);
        setHasError(true);
        setIsLoadingPage(false);
      });
  }, [showId]);

  const mapShowProperties = (show: any) => {
    let filteredShow: any = {};
    Object.keys(show).map(key => {
      ['name', 'type', 'language', 'status', 'officialSite'].includes(key) && (filteredShow[key] = show[key]);
    });
    const mappedProperties = Object.keys(filteredShow).map(key => {
      return (
        <Tr>
          <Td>{key.charAt(0).toUpperCase() + key.slice(1)}</Td>
          <Td>{filteredShow[key] || 'No data'}</Td>
        </Tr>
      );
    });
    return mappedProperties;
  };

  return (
    <>
      {isLoadingPage && !hasError ? (
        <LoadingPage />
      ) : (
        <>
            <HStack marginBottom={14}>
              <Link to='/'>
                <Button>Go Back!</Button>
              </Link>
              <Heading width={'80%'} textAlign={'center'}>
                {show ? `Show: ${show?.name}` : 'Some error ocurred. Wrong request.'}
              </Heading>
            </HStack>
          <Table variant='simple' marginTop={5} width={'50%'} marginX={'auto'}>
            <Tbody>{show && mapShowProperties(show)}</Tbody>
          </Table>
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
};

export default SingleShow;
