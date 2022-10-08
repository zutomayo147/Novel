import { NextPage } from "next"
import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
// import Link from "next/link"
import { IconButton } from "@chakra-ui/button"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

import { PrimaryButton } from "components/atoms/button/PrimaryButton"
// import { AppTop } from "components/Layouts/AppTop"
import useSignUp from "drf/auth/useSignUp"

// type Props = {
//   email: string
//   userName: string
//   password: string
// }

const SignUp: NextPage = () => {
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
    <Flex justifyContent="center">
      <Box>
        <Heading as="h1" size="lg" textAlign="center">
          アカウントを作成
        </Heading>
        <Divider my={4} />
        <Stack spacing={4} py={4} px={10}>
          <InputGroup>
            <Input placeholder="ユーザ名" value={userName} onChange={onChangeUserName} />
          </InputGroup>
          <InputGroup>
            <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
          </InputGroup>
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
          <PrimaryButton disabled={userName === "" || email === "" || password === ""} onClick={onClickSignUp}>
            新規作成
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
}

// SignUp.getLayout = (page: ReactElement) => {
//   return page
// }

export default SignUp