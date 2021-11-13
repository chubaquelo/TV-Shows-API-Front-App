import React, { useState, useEffect } from 'react';
import { GetShows } from '../core/interactors/GetShows';
import { APIShowsRepository } from '../core/repositories/APIShowsRepository';
import LoadingPage from '../components/utils/loadingPage';
import { useParams } from 'react-router-dom';
import { Show } from '../core/entities/show';
import SinglePageHeader from '../components/singlePageHeader/SinglePageHeader';
import {
  HStack,
  Alert,
  AlertIcon,
  Table,
  Tr,
  Tbody,
  Td,
  Image,
  AspectRatio,
} from '@chakra-ui/react';

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

  const mapShowBasicProperties = (show: any) => {
    let filteredShow: any = {};
    Object.keys(show).map(key => {
      ['name', 'type', 'language', 'status', 'officialSite'].includes(key) && (filteredShow[key] = show[key]);
    });
    const mappedBasicProperties = Object.keys(filteredShow).map(key => {
      return (
        <Tr>
          <Td>{key.charAt(0).toUpperCase() + key.slice(1)}</Td>
          <Td>{filteredShow[key] || 'No data'}</Td>
        </Tr>
      );
    });
    return mappedBasicProperties;
  };

  return (
    <>
      {isLoadingPage && !hasError ? (
        <LoadingPage />
      ) : (
        <>
          <SinglePageHeader show={show} />
          <HStack height={'100vh'} alignItems={'self-start'} justifyContent={'space-between'} wrap={'wrap'}>
            <Image maxWidth={'450px'} src={show?.image?.original} alt={`${show?.name} Cover`} objectFit='cover' />
            <Table variant='simple' marginTop={5} width={'50%'} marginX={'auto'}>
              <Tbody>{show && mapShowBasicProperties(show)}</Tbody>
            </Table>
          </HStack>
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
