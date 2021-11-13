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
    let mappedProperties: any = [];
    let filteredShow: any = {};
    Object.keys(show).map(key => {
      ['name', 'type', 'language', 'status', 'officialSite'].includes(key) && (filteredShow[key] = show[key]);
    });
    mappedProperties = Object.keys(filteredShow).map(key => {
      return (
        <Tr>
          <Td>{key}</Td>
          <Td>{filteredShow[key]}</Td>
        </Tr>
      );
    });
    return mappedProperties;
  };

  return (
    <>
      {isLoadingPage ? (
        <LoadingPage />
      ) : (
        <>
          <HStack marginBottom={5}>
            <Link to='/'>
              <Button>Go Back!</Button>
            </Link>
            <Heading width={'80%'} textAlign={'center'}>
              Show: {show?.name}
            </Heading>
          </HStack>
          <Table variant='simple' marginTop={5}>
            <Thead>
              <Tr>
                <Th>Property</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>{mapShowProperties(show)}</Tbody>
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
