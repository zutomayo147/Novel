// import AppHeader from "components/Molecules/AppHeader"
// import AppTop from "components/Layouts/AppTop"
import { Layout } from "components/Layouts/Layout"
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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(event);
  }
  return (
    <>
      <Flex flexDirection='column' alignItems='center' w="100vw">
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
    </>
  )
}
Home.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home