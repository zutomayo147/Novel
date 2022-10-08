// import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
// import { IconButton } from "@chakra-ui/button"
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
// import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout"
// import { PrimaryButton } from "components/atoms/button/PrimaryButton"
// import { useSignIn } from "hooks/useSignIn"
// import { AppTop } from "components/Layouts/AppTop"

// import { Button, ButtonGroup } from '@chakra-ui/react'
// import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
// import Link from "next/link"
// import { NextPage } from "next"
// import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
import { ReactElement } from "react"

const Home = () => {
  return (
    <Flex flexDirection='column' alignItems='center' >
      <Text>About</Text>
    </Flex>
  )
}
Home.getLayout = (page: ReactElement) => {
  return (
    page
  )
}

export default Home