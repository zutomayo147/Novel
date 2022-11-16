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
  Divider,
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Textarea } from '@chakra-ui/react'
import { ChangeEvent, ReactElement, ReactNode } from "react"
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { CreateNovel } from "drf/posts/CreateNovel"
import { HeaderBeforeLogIn } from '@/components/Layouts/HeaderBeforeLogIn';

// const UserHome: NextPage = () => {
function PostPage() {
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
  const [value, setValue] = useState('i');
  const [resize, setResize] = useState('horizontal');

  // const inputEl = useRef("")
  const [post_title, setTitle] = useState("");
  // const [userName, setuserName] = useState("")
  const [post_caption, setCaption] = useState("");
  const [post_content, setContent] = useState("");
  // const signIn = useSignIn()
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeCaption = (e: ChangeEvent<HTMLInputElement>) => setCaption(e.target.value);
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  // const onClickPost = () => CreateNovel({ post_title, post_caption, post_content })
  const newNovel = CreateNovel();
  const onClickPost = () => newNovel({ post_title, post_caption, post_content });
  // <Button disabled={email === "" || password === ""} onClick={onClickLogin} m="50px">新規作成</Button>
  // const onClickNewPost = () => newPost({ email, password })
  //   < Textarea
  // ref = { inputEl }
  // value = { content }
  // onChange = { handleInputChange }
  // placeholder = 'Here is a sample placeholder'
  // size = 'sm'
  // w = "50vw"
  //   />
  // <Textarea
  //   ref={inputEl}
  //   onChange={handleInputChange}
  //   placeholder='Here is a sample placeholder'
  //   size='sm'
  //   w="50vw"
  // />
  // < button onClick = {() => alert(inputEl.current.value)}> 値の確認</button >
  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value
  //   setValue(inputValue)
  // }
  if (cookie.isLogin) {
    return (
      <>
        <HeaderBeforeLogIn />
        <Flex flexDirection="column" alignItems="left"
         mx={{ base: "10vw", md: "20vw"}}
        >
          <Text mt="60px" 
            fontSize={{ base: "36px", md: "48px" }}>
            新規小説作成

          </Text>
          <Divider />
          <Flex flexDirection='column'>
            <Text fontSize={{ base: "32px", md: "36px" }}
              mt="30px"
            >
              タイトル
            </Text>
            <InputGroup>
              <Input placeholder="タイトル" value={post_title} onChange={onChangeTitle} />
            </InputGroup>
          </Flex>
          <Flex flexDirection='column'
            mt="30px"
          >
            <Text fontSize={{ base: "32px", md: "36px" }}>
             arasuzi 
            </Text>
            <InputGroup>
              <Input placeholder="概略" value={post_caption} onChange={onChangeCaption} />
            </InputGroup>
          </Flex>
          <Flex mt="30px" 
            flexDirection="column">
            <Text fontSize={{ base: "32px", md: "36px" }}>
              honbun
            </Text>
            <Textarea
            onChange={onChangeContent}
            placeholder=''
            h="50vh"
            />
            <Link href="/snippets/">
            </Link>
            <Button 
              disabled={post_title === "" || post_caption === "" || post_content === ""} 
              onClick={onClickPost}
              my="60px" mx="auto">
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

PostPage.getLayout = (page) => {
  return (
    page
  )
}


export default PostPage