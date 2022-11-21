// import type { NextPage } from 'next'
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
import { Textarea } from '@chakra-ui/react'
import { ChangeEvent, ReactElement, ReactNode } from "react"
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { CreateNovel } from "drf/posts/CreateNovel"

// const UserHome: NextPage = () => {
const EditPage = () => {
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
  const [value, setValue] = useState('i')
  const [resize, setResize] = useState('horizontal')

  // const inputEl = useRef("")

  const [title, setTitle] = useState("")
  // const [userName, setuserName] = useState("")
  const [caption, setCaption] = useState("")
  const [content, setContent] = useState("")
  // const signIn = useSignIn()
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onChangeCaption = (e: ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)
  // const onClickPost = () => CreateNovel({ post_title, post_caption, post_content })
  const newNovel = CreateNovel()
  const onClickPost = () => newNovel({ title, caption, content })

  if (cookie.isLogin) {
    return (
      <>
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
          <Textarea
            onChange={onChangeContent}
            placeholder='Here is a sample placeholder'
            size='sm'
            w="50vw"
          />
          <Input placeholder='Basic usage' />
          <Link href="/snippets/">
          </Link>
          <Button m="50px" disabled={title === "" || caption === "" || content === ""} onClick={onClickPost}>新規作成</Button>
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


export default EditPage