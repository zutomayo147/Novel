import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  IconButton,
  ButtonGroup,
  Spacer,
  Text
} from '@chakra-ui/react';
import { Layout } from "components/Layouts/Layout"
import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import Link from "next/link"
import useSignUp from "drf/auth/useSignUp"
import { PrimaryButton } from "components/atoms/button/PrimaryButton"
// import { ChangeEvent, ReactElement, ReactNode, useState } from "react"

const Home = () => {

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const signUp = useSignUp()
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const handleClick = () => setShowPassword(!showPassword)
  const onClickSignUp = () => signUp({ email, password, userName })
  return (
    <>
      <Flex
        w="100vw"
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <Box>
                <FormControl isRequired>
                  <FormLabel>ユーザーネーム</FormLabel>
                  <Input placeholder="ユーザ名" value={userName} onChange={onChangeUserName} />
                </FormControl>
              </Box>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="パスワード 英数字8文字以上"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={onChangePassword}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex justifyContent = "center">
                <PrimaryButton disabled={userName === "" || email === "" || password === ""} onClick={onClickSignUp}>
                  Sign up
                </PrimaryButton>
              </Flex>
            </Stack>
          </Box>
        </Stack>
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