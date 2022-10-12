import { ChangeEvent, ReactElement, ReactNode, useState, useMemo } from "react"
import Link from "next/link"
import { IconButton } from "@chakra-ui/button"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout"

import { PrimaryButton } from "components/atoms/button/PrimaryButton"
import CreateSnippet from "drf/snippets/newSnippet"
import { NextPage } from "next"
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
// import { AppTop } from "components/Layouts/AppTop"

const SignIn: NextPage = () => {
  // const [email, setEmail] = useState("")
  const [title, setTitle] = useState("")
  const [code, setCode] = useState("")
  const [linenos, setLinenos] = useState(false)
  const [checked, setChecked] = useState(false)

  const [language, setLanguage] = useState("")
  const [style, setStyle] = useState("")
  const newSnippet = CreateSnippet()

  const handleCheckboxClick = useMemo(() => {
    console.log("function generated in Checkbox");
    return (e) => {
      setChecked(!checked);
    };
  }, [checked]);

  // const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)
  const onChangeLanguage = (e: ChangeEvent<HTMLInputElement>) => setLanguage(e.target.value)
  const onChangeStyle = (e: ChangeEvent<HTMLInputElement>) => setStyle(e.target.value)
  const onClickLogin = () => newSnippet({ title, code, linenos, language, style })
  // const { title, code, linenos, language, style } = props
  // <Input
  //   placeholder="linenos"
  //   value={linenos}
  //   onChange={onChangeCode}
  // />
  // <Checkbox
  //   isChecked={checked}
  //   // onChange={(e) => setChecked(e.target.checked)}
  //   onChange={handleCheckboxClick}
  // >
  //   linenos
  // </Checkbox>

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box>
        <Heading as="h1" size="lg" textAlign="center">
          投稿
        </Heading>
        <Divider my={4} />
        <Stack spacing={4} py={4} px={10}>
          <Input placeholder="たいとる" value={title} onChange={onChangeTitle} />
          <InputGroup>
            <Input
              placeholder="こーど"
              value={code}
              onChange={onChangeCode}
            />
            <Input
              placeholder="python"
              value={language}
              onChange={onChangeLanguage}
            />
            <Input
              placeholder="abap"
              value={style}
              onChange={onChangeStyle}
            />
          </InputGroup>
          <PrimaryButton disabled={title === "" || code === "" || language === "" || style === ""} onClick={onClickLogin}>
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