import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
import Link from "next/link"
import { IconButton } from "@chakra-ui/button"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

import { PrimaryButton } from "components/atoms/button/PrimaryButton"
import { useSignIn } from "drf/auth/useSignIn"
import { NextPage } from "next"
import { Layout } from "components/Layouts/Layout"

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

const SignIn: NextPage = () => {
  const [email, setEmail] = useState("")
  // const [userName, setuserName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const signIn = useSignIn()

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handleClick = () => setShowPassword(!showPassword)
  const onClickLogin = () => signIn({ email, password })
  // TODO
  // const onClickLogin = () => signIn({props:userInfo})

  return (
    <>
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        w="100vw"
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="パスワード"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={onChangePassword}
                />
              </FormControl>
              <Stack spacing={10}>
                <PrimaryButton disabled={email === "" || password === ""} onClick={onClickLogin}>
                  Sign in
                </PrimaryButton>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  Forgot password?
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

SignIn.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default SignIn