import React, { useState, useEffect } from 'react';
import { GetShows } from '../core/interactors/GetShows';
import { APIShowsRepository } from '../core/repositories/APIShowsRepository';
import LoadingPage from '../components/utils/loadingPage';
import { useParams } from 'react-router-dom';
import { Show } from '../core/entities/show';
import { StarsRating } from "stars-rating-react-hooks";
import SinglePageHeader from '../components/singlePageHeader/SinglePageHeader';
import {
  HStack,
  Text,
  Alert,
  AlertIcon,
  Table,
  Tr,
  Tbody,
  Td,
  Image,
} from '@chakra-ui/react';

const SingleShow = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [show, setShow] = useState<Show>();
  const [imageSrc, setImageSrc] = useState<string>('https://via.placeholder.com/420x590.png?text=No+Image');
  const { showId } = useParams();

  useEffect(() => {
    const useShows = new GetShows(new APIShowsRepository());
    setIsLoadingPage(true);
    useShows
      .getShowById(showId)
      .then(response => {
        setShow(response);
        setImageSrc(response.image?.original ? response.image.original : 'https://via.placeholder.com/420x590.png?text=No+Image');
        setIsLoadingPage(false);
      })
      .catch(error => {
        console.error(error);
        setHasError(true);
        setIsLoadingPage(false);
      });
  }, [showId]);

  const ratingConfig = {
    totalStars: 10,
    initialSelectedValue: show?.rating?.average,
    renderFull: (
      <img alt='full' src="https://img.icons8.com/ios-filled/20/000000/star--v1.png" />
    ),
    renderEmpty: (
      <img alt='empty' src="https://img.icons8.com/ios/20/000000/star--v1.png" />
    ),
    renderHalf: (
      <img alt='half' src="https://img.icons8.com/ios-filled/20/000000/star-half-empty.png" />
    )
  };

  const mapShowBasicProperties = (show: any) => {
    let filteredShow: any = {};
    Object.keys(show).map(key => {
      return ['name', 'type', 'language', 'status', 'officialSite'].includes(key) && (filteredShow[key] = show[key]);
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
          <HStack height={'full'} alignItems={'self-start'} justifyContent={'center'} wrap={'wrap'}>
            <Image maxWidth={'450px'} src={imageSrc} alt={`${show?.name} Cover`} objectFit='cover' borderRadius={'10px'} marginRight={[0, 0, 5, 10]} />
            <Table variant='simple' marginTop={5} width={'50%'} marginX={'auto'} backgroundColor={'#ffffff10'} borderRadius={'10px'} color={'white'}>
              <Tbody>{show && mapShowBasicProperties(show)}</Tbody>
              <Tr>
                <Td>Rating</Td>
                <Td display={'flex'}>
                  <StarsRating config={ratingConfig} />
                  <Text paddingLeft={3}>{`(${show?.rating?.average})`}</Text>
                </Td>
              </Tr>
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
