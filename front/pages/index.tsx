// import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
// import { IconButton } from "@chakra-ui/button"
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
// import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout"
// import { PrimaryButton } from "components/atoms/button/PrimaryButton"
// import { useSignIn } from "hooks/useSignIn"
// import { AppTop } from "components/Layouts/AppTop"
// import { AppName } from "components/atoms/appName"
import { AppHeader } from "components/Molecules/AppHeader"
import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
import { Box, Divider, Heading, Stack } from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { IconButton } from "@chakra-ui/button"
import { PrimaryButton } from "components/atoms/button/PrimaryButton"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup } from '@chakra-ui/react'
// import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Link from "next/link"
// import { NextPage } from "next"
import useSignUp from "drf/auth/useSignUp"
// import { css } from '@emotion/react'
// import styled from '@emotion/styled'
//
// const bgcolor = "#666666";
//
// const Box3 = styled.div`
//   width: 200px;
//   height: 100px;
//   background-color: ${bgcolor};
//   color: white;
// `
// const helloStyle = css({
//   color: 'red'
// });
// <h1 css={helloStyle}>Hello</h1>
// <Box3>box3</Box3>



// import { ChangeEvent, ReactElement, ReactNode, useState } from "react"

const Home = () => {

  // const [userName, setUserName] = useState("")
  // const [password, setPassword] = useState("")
  // const [email, setEmail] = useState("")
  // const [showPassword, setShowPassword] = useState(false)
  // const signUp = useSignUp()
  // const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
  // const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  // const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  // const handleClick = () => setShowPassword(!showPassword)
  // const onClickSignUp = () => signUp({ email, password, userName })
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
      </Flex>
    </>
  )
}
Home.getLayout = (page: ReactElement) => {
  return (
    page
  )
}

export default Home