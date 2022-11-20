import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  InputLeftElement,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  InputGroup
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import { HamburgerIcon } from "@chakra-ui/icons";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      flexDirection="column"
      alignContent="center"
      justifyContent="space-between"
      wrap="wrap"
      pt={4}
      pb={2}
      bg="blackAlpha.900"
      color="white"
    >
      <Flex mb={2} justifyContent="center">
        <Heading size="lg" fontStyle="inherit" fontWeight="light" >
          GitNovel
        </Heading>
      </Flex>
      <FormControl w="50vw">
        <InputGroup>
          <Input borderRadius="15" bg="white" placeholder = "検索機能を生やす" />
          <InputLeftElement color="black" >
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </FormControl>
      <Flex flexDirection = "column" alignContent = "center">
        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon />
          ドロワーにする
        </Box>
        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          justifyContent="center"
          mt={1}
          fontSize="xl"
        >
          <Text>Home</Text>
          <Text>Create</Text>
          <Text>Account</Text>
        </Stack>

      </Flex>


      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
      </Box>
    </Flex>
  );
};