import { Box, Text, Divider, Grid, GridItem } from "@chakra-ui/layout";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar"
import { Input, Flex, Spacer } from '@chakra-ui/react'
import { AiFillLock } from 'react-icons/ai';

export const LpHeader = () => {
  return (
    <Flex
      bg="F6F8FA"
      color="#0969DA"
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
        <AiFillLock size={32} />
        <Text>userID</Text>
        <Text>/</Text>
        <Text>RepoName</Text>
      </Flex>
      <Spacer />
      <Flex gap="20px" mr="10px">
        <Text>Unwatch</Text>
        <Text>Fork</Text>
        <Text>Star</Text>
      </Flex>
    </Flex >
  );
};

export default LpHeader