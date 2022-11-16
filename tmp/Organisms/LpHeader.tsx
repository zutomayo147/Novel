import { Box, Text, Divider, Grid, GridItem } from "@chakra-ui/layout";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar"
import { Input, Flex, Spacer } from '@chakra-ui/react'
import { AiOutlineGithub, AiOutlineBell } from 'react-icons/ai';

export const LpHeader = () => {
  return (
    <Flex
      bg="#24292F"
      color="#ffffff"
      h="64px"
      gap="20px"
      justifyContent="center"
      alignItems="center"
      fontSize="md"
      fontFamily="Rajdhani"
      transition="all .0.2s"
      fontWeight="bold"
    >
      <Flex w="250px" gap="15px" ml="100px">
        <AiOutlineGithub size={32} />
        <Input h="32px" placeholder='Search' />
      </Flex>
      <Flex
        _hover={{ textDecoration: "underline 1px" }}
        gap="15px"
      >
        <Text>
          Pulls
        </Text>
        <Text>
          Issue
        </Text>
        <Text>
          Marketplace
        </Text>
      </Flex>
      <Spacer />
      <Flex gap="20px" mr="10px">
        <AiOutlineBell size={28} />
        <Avatar size="sm" mr="10px" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
      </Flex>
    </Flex>

  );
};

export default LpHeader