import { Box, Text, Divider, Grid, GridItem } from "@chakra-ui/layout";
import { Avatar, AvatarGroup } from "@chakra-ui/avatar"
import { Input, Flex, Spacer } from '@chakra-ui/react'
import { AiOutlineGithub, AiOutlineBell } from 'react-icons/ai';

export const LpHeader = () => {
  return (
    <Box
      bg="#24292F"
      color="#ffffff"
      justifyContent="center"
      alignItems="center"
      fontSize="md"
      fontFamily="Rajdhani"
      fontWeight="bold"
    >
      <Text>About</Text>
      <Text>No description, website, or topics provided.</Text>
      <Text>Readem</Text>
      <Text>stars</Text>
      <Text>watching</Text>
      <Text>forks</Text>
      <Text>etc</Text>
      <Text></Text>
    </Box>

  );
};

export default LpHeader