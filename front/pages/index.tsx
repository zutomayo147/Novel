import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
import { Layout } from "components/Layouts/Layout"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useBreakpointValue } from "@chakra-ui/react"
import { Flex, Spacer } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Link from "next/link"
import useSignUp from "drf/auth/useSignUp"

const onClickSignUp = () => console.log(1)


const Home = () => {
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