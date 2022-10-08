import { Box, Text, Divider, Grid, GridItem } from "@chakra-ui/layout";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar"
import { Input, Flex, Spacer } from '@chakra-ui/react'
import { AiFillLock } from 'react-icons/ai';

export const LpHeader = () => {
  return (
    <Flex
      bg="F6F8FA"
      color="black"
      h="64px"
      gap="20px"
      justifyContent="center"
      alignItems="center"
      fontSize="md"
      fontFamily="Rajdhani"
      transition="all .0.2s"
      fontWeight="bold"
    >
      <Text>Code</Text>
      <Text>Issue</Text>
      <Text>PullReq</Text>
      <Text>Discussions</Text>
      <Text>Actions</Text>
      <Text>Projects</Text>
      <Text>Wiki</Text>
      <Spacer />
      <Flex gap="20px" mr="10px">
        <Text>...</Text>
      </Flex>
    </Flex >
  );
};

export default LpHeader