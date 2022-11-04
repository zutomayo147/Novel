import type { NextPage } from 'next'
import Link from "next/link"
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import AppHeader from "components/Molecules/AppHeader"
import { Textarea } from '@chakra-ui/react'
import { ChangeEvent, ReactElement, ReactNode } from "react"
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useState, useRef } from 'react'

// const UserHome: NextPage = () => {
const PostPage: NextPage = () => {
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
  const [value, setValue] = useState('i')
  const [resize, setResize] = useState('horizontal')

  const inputEl = useRef(null)

  const [title, setTitle] = useState("")
  // const [userName, setuserName] = useState("")
  const [caption, setCaption] = useState("")
  const [content, setContent] = useState("")
  // const signIn = useSignIn()
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onChangeCaption = (e: ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)
  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)
  // const onClickPost = () => signIn({ email, password })


  // <Button disabled={email === "" || password === ""} onClick={onClickLogin} m="50px">新規作成</Button>
  // const onClickNewPost = () => newPost({ email, password })

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  if (cookie.isLogin) {
    return (
      <>
        <AppHeader />
        <Flex flexDirection="column" alignItems="center">
          <Text>新規小説作成</Text>
          <Text>タイトル</Text>
          <InputGroup>
            <Input placeholder="タイトル" value={title} onChange={onChangeTitle} />
          </InputGroup>

          <Text>概略</Text>
          <InputGroup>
            <Input placeholder="概略" value={caption} onChange={onChangeCaption} />
          </InputGroup>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-end">
          <Box mr="300px">
            <Text  >作者</Text>
            <Text>ジャンル</Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" alignItems="center">

          <button onClick={() => alert(inputEl.current.value)}>値の確認</button>
          <Textarea
            ref={inputEl}
            value={content}
            placeholder='Here is a sample placeholder'
            size='sm'
            resize={resize}
            w="50vw"
          />
          <Link href="/snippets/">
          </Link>
        </Flex>
      </>
    )
  } else {
    return (
      <div>
        <p>No cookie</p>
        <p>Please login onemore</p>
        <Link href="/signIn">
          <Button>re-login</Button>
        </Link>
      </div>
    )
  }
}
// <Button m="50px" disabled={title === "" || caption === "" || inputEl.current.value} onClick={onClickLogin}>新規作成</Button>

PostPage.getLayout = (page) => {
  return (
    page
  )
}


export default PostPage