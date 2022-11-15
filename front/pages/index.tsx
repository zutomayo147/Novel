import { AppHeader } from "components/Molecules/AppHeader"
import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
import { Box, Divider, Heading, Stack } from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { IconButton } from "@chakra-ui/button"
import { PrimaryButton } from "components/atoms/button/PrimaryButton"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useBreakpointValue } from "@chakra-ui/react"
// import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Link from "next/link"
// import { NextPage } from "next"
import useSignUp from "drf/auth/useSignUp"
// import { css } from '@emotion/react'
// import styled from '@emotion/styled'
//


const onClickSignUp = () => console.log(1)

// import { ChangeEvent, ReactElement, ReactNode, useState } from "react"

const Home = () => {
  // const breakpointValue = useBreakpointValue(["base", "sm", "md", "lg"])
  // const breakpointValue = useBreakpointValue(["base", "sm", "md", "lg", "xl", "2xl"])
  // const breakpointValue = useBreakpointValue([ "md", "lg"])
  const handleClick = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(event);
  }
      // <Box>Current Size:{breakpointValue}</Box>
  return (
    <>
      <Flex flexDirection='column' alignItems='center' >
        <Text>LandingPage</Text>
        <Link href="/signUp">
          <Button colorScheme='teal' variant='solid'>
            signUp
          </Button>
        </Link>
        <Link href="/signIn">
          <Button colorScheme='teal' variant='outline'>
            signIn
          </Button>
        </Link>
        <Button onClick={onClickSignUp} m={10}>
          API test
        </Button>
        <button onClick={handleClick}>Click</button>
        <button onClick={(event) => { }}>Click</button>
      </Flex>
      <Stack>
        <Box p={2} bg={{ base: "red.200", sm: "yellow.200", md: "green.200", lg: "blue.200" }} >
          {`["red.200", "yellow.200", "green.200", "blue.200"]`}
        </Box>
        <Box p={2} bg={{ base: "red.200", sm: "yellow.200", md: "green.200", lg: "blue.200" }} >
          {`{base: "red.200", sm: "yellow.200", md: "green.200", lg: "blue.200" }`}
        </Box>
        <Box p={2} bg={{ sm: "yellow.200", md: "green.200", lg: "blue.200" }} >
          {`{ sm: "yellow.200", md: "green.200", lg: "blue.200" }`}
        </Box>
        <Box p={2} bg={{ base: "red.200", md: "green.200", lg: "blue.200" }} >
          {`{ base: "red.200", md: "green.200", lg: "blue.200" }`}
        </Box>
      </Stack>

    </>
  )
}
Home.getLayout = (page: ReactElement) => {
  return (
    page
  )
}

export default Home