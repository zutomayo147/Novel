import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
import Link from "next/link"
import { IconButton } from "@chakra-ui/button"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout"

import { PrimaryButton } from "components/atoms/button/PrimaryButton"
import { useSignIn } from "drf/auth/useSignIn"
import { NextPage } from "next"
// import { AppTop } from "components/Layouts/AppTop"

// TODO
// type userInfo = {
//   userName: string
//   password: string
// }


const SignIn: NextPage = () => {
  // const [email, setEmail] = useState("")
  const [userName, setuserName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const signIn = useSignIn()

  // const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => setuserName(e.target.value)
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handleClick = () => setShowPassword(!showPassword)
  const onClickLogin = () => signIn({ userName, password })
// TODO
  // const onClickLogin = () => signIn({props:userInfo})

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box>
        <Heading as="h1" size="lg" textAlign="center">
          ログイン
        </Heading>
        <Divider my={4} />
        <Stack spacing={4} py={4} px={10}>
          <Input placeholder="userName" value={userName} onChange={onChangeUserName} />
          <InputGroup>
            <Input
              placeholder="パスワード"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChangePassword}
            />
            <InputRightElement>
              <IconButton
                size="sm"
                bgColor="white"
                _focus={{ boxShadow: "none" }}
                aria-label="ShowPassword Switch"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
          <PrimaryButton disabled={userName === "" || password === ""} onClick={onClickLogin}>
            ログイン
          </PrimaryButton>
          <Link href="/signUp">ユーザー登録されていない方はこちら</Link>
          <Link href="/resetPassword">パスワードを忘れた方はこちら</Link>
        </Stack>
      </Box>
    </Flex>
  )
}

// SignIn.getLayout = (page: ReactElement) => {
//   return page
// }

export default SignIn