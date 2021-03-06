import React from 'react'
import { Button, Heading, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Show } from '../../core/entities/show';

interface SinglePageHeaderProps {
  show: Show | undefined;
}

function SinglePageHeader(props: SinglePageHeaderProps) {
  const {show} = props;
  return (
    <HStack marginBottom={14}>
      <Link to='/'>
        <Button colorScheme={'twitter'}>Go Back!</Button>
      </Link>
      <Heading width={'80%'} textAlign={'center'} color={'white'} data-testid={'single-show-title'}>
        {show ? `Show: ${show?.name}` : 'Some error ocurred. Wrong request.'}
      </Heading>
    </HStack>
  );
}

export default SinglePageHeader
