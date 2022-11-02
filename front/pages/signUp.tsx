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
import { Flex, Spacer } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Link from "next/link"
import useSignUp from "drf/auth/useSignUp"
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
      <AppHeader />
      <Flex flexDirection='column' alignItems='center' >
        <Box height="1em" m="5em">
          <Text>アカウントをお持ちの方はこちら</Text>
        </Box>
        <Box height="1em" m="5em">
          <Text>会員登録</Text>
        </Box>
        <Stack spacing={4} py={4} px={10}>
          <InputGroup>
            <Input placeholder="ユーザ名" value={userName} onChange={onChangeUserName} />
          </InputGroup>
          <InputGroup>
            <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
          </InputGroup>
          <InputGroup>
            <Input
              placeholder="パスワード 英数字8文字以上"
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