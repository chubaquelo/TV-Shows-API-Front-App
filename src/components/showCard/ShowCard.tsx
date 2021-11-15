import React, {useState} from 'react';
import { Image, Text, Flex, VStack, HStack } from '@chakra-ui/react';
import { Show } from '../../core/entities/show';
import { Link } from 'react-router-dom';

interface ShowCardProps {
  show: Show;
}

const ShowCard = (props: ShowCardProps) => {
  const [cardScale, setCardScale] = useState<string>('1');
  const { show } = props;
  const imageSrc = show.image?.medium ? show.image?.medium : 'https://via.placeholder.com/210x295.png?text=No+Image';

  const handleOnMouseEnter = () => {
    setCardScale('1.1')
  }

  const handleOnMouseLeave = () => {
    setCardScale('1')
  }

  const currentCardScale = {
      transform: `scale(${cardScale})`
    }

  return (
    <Flex justifyContent={'center'} width={'full'} sx={currentCardScale}>
      <VStack alignItems={'center'} position={'relative'} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
        <Link to={`/${show.id}`}>
          <Image width={'210px'} heigth={'295px'} src={imageSrc} alt={`${show.name}`} borderRadius={'10px'} scale={'125%'} />
          <HStack justifyContent={'space-between'} width={'full'} position={'absolute'} bottom={'10px'} padding={'2'} backgroundColor={'#00000099'}>
            <Text color={'white'} width={'full'} textAlign={'center'} fontWeight={'bold'} fontSize={'md'}>
              {show.name}
            </Text>
          </HStack>
        </Link>
      </VStack>
    </Flex>
  );
}

export default ShowCard;
