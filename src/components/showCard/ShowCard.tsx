import React from 'react';
import { Box, Image, Text, Flex, VStack, HStack, Button } from '@chakra-ui/react';
import { Show } from '../../core/entities/show';
import { Link } from 'react-router-dom';

interface ShowCardProps {
  show: Show;
}

const ShowCard = (props: ShowCardProps) => {
  const { show } = props;
  const imageSrc = show.image?.medium ? show.image?.medium : 'https://via.placeholder.com/210x295.png?text=No+Image';

  return (
    <Flex justifyContent={'center'} width={'full'}>
      <VStack alignItems={'center'}>
        <Image width={'210px'} heigth={'295px'} src={imageSrc} alt={`${show.name}`} />
        <HStack justifyContent={'space-between'} width={'full'}>
          <Text fontSize={'sm'}>{show.name}</Text>

          <Link to={`/${show.id}`}>
            <Button color={'blue.400'} fontSize={'sm'}>
              More Info
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default ShowCard;
