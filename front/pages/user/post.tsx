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
  Divider,
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Textarea } from '@chakra-ui/react'
import { ChangeEvent, ReactElement, ReactNode } from "react"
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { CreateNovel } from "drf/posts/CreateNovel"
import { Layout } from "components/Layouts/Layout"

// const UserHome: NextPage = () => {
const PostPage = () => {
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
  const [value, setValue] = useState('i');
  const [resize, setResize] = useState('horizontal');

  // const inputEl = useRef("")

  const [title, setTitle] = useState("")
  // const [userName, setuserName] = useState("")
  const [caption, setCaption] = useState("")
  const [content, setContent] = useState("")
  // const signIn = useSignIn()
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeCaption = (e: ChangeEvent<HTMLInputElement>) => setCaption(e.target.value);
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  // const onClickPost = () => CreateNovel({ post_title, post_caption, post_content })
  const newNovel = CreateNovel()
  const onClickPost = () => newNovel({ title, caption, content })


  if (cookie.isLogin) {
    return (
      <>
        <Flex flexDirection="column" alignItems="center" w="100vw">
            
          <Flex flexDirection='column' w="70vw">
            <Text my={10} fontSize='42px'>
              新規小説作成
            </Text>
            <Text fontSize='28px'>
              タイトル
            </Text>
            <InputGroup mb={10}>
              <Input placeholder="タイトル" value={title} onChange={onChangeTitle} />
            </InputGroup>
            <Text fontSize='28px'>
              概略
            </Text>
            <InputGroup mb={10}>
              <Input placeholder="概略" value={caption} onChange={onChangeCaption} />
            </InputGroup>
            <Text fontSize='28px'>
              タグ選択
            </Text>
            <InputGroup mb={10}>
              <Input placeholder="たぐ、後で" />
            </InputGroup>

            <Link href="/snippets/">
            </Link>
            <Button my="50px" w="20vw" mr="auto" ml="auto" 
            disabled={title === "" || caption === "" || content === ""} 
            onClick={onClickPost}
            >
              新規作成
            </Button>
          </Flex>
        </Flex>

      </>
    );
  } else {
    return (
      <div>
        <p>No cookie</p>
        <p>Please login onemore</p>
        <Link href="/signIn">
          <Button>re-login</Button>
        </Link>
      </div>
    );
  }
}

PostPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


export default PostPage