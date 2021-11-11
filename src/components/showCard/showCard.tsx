import React from 'react';
import { Box, Image, Text, Link } from '@chakra-ui/react';
import { Show } from '../../core/entities/show';

interface ShowCardProps {
  show: Show;
}

const ShowCard = (props: ShowCardProps) => {
  const { show } = props;
  const imageSrc = show.image?.medium ? show.image?.medium : 'https://via.placeholder.com/210x295.png?text=No+Image';

  return (
    <Box width={'210px'} heigth={'295px'}>
      <Image src={imageSrc} alt={`${show.name}`} />

      <Text fontSize={'sm'}>
        {show.name}
        <Link paddingLeft={2} color='teal.500' href='#'>
          More Info
        </Link>
      </Text>
    </Box>
  );
}

export default ShowCard;
