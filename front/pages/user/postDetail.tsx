// import type { NextPage } from 'next'
import { LayoutNoFooter } from "components/Layouts/LayoutNoFooter"
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
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { FaPenNib } from "react-icons/fa";

import { useCookies } from 'react-cookie';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Textarea } from '@chakra-ui/react'
import { ChangeEvent, ReactElement, ReactNode } from "react"
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { CreateNovel } from "drf/posts/CreateNovel"
import { useRouter } from "next/router";
import { IoArrowBackCircle } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";


const PostPage = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
  const [value, setValue] = useState('i')
  const [resize, setResize] = useState('horizontal')

  // const inputEl = useRef("")

  // const [title, setTitle] = useState("")
  // const [userName, setuserName] = useState("")
  const [caption, setCaption] = useState("")
  const [content, setContent] = useState("")
  // const signIn = useSignIn()
  // const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onChangeCaption = (e: ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)
  // const onClickPost = () => CreateNovel({ post_title, post_caption, post_content })
  const newNovel = CreateNovel()
  // const onClickPost = () => newNovel({ title, caption, content })
  // const onClickPost = () => newNovel({ caption, content })

  // const historyList = [1, 4, 9, 16];


  if (cookie.isLogin) {
    return (
      <>
        <ul>
          <li>name:{" " + router.query.title}</li>
        </ul>
        <Flex flexDirection="column" w="100vw">
          <Box ml={20}>userName/タイトル </Box>
          <Flex justifyContent="center" >タイトル</Flex>
          <Flex justifyContent="center">履歴ツリー</Flex>
          <Flex justifyContent="end" mr={20}>作者</Flex>
          <Flex justifyContent="end" mr={20}>タグ</Flex>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Text>概略</Text>
          <InputGroup>
            <Input placeholder="概略" value={caption} onChange={onChangeCaption} w="50vw" />
          </InputGroup>
          <Text>なかみ</Text>
          <Flex justifyContent="end" w = "100vw">
            <FaPenNib size = {10} />
            <AiOutlineHeart />
            <FaRegCommentDots />
          </Flex>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Textarea
            onChange={onChangeContent}
            placeholder='Here is a sample placeholder'
            w="50vh"
            h="50vw"
          />
          <TableContainer w="80vw" borderWidth="medium" borderRadius={20}>
            <Table variant='striped' colorScheme='gray' >
              <TableCaption placement="top">連載中</TableCaption>
              <Thead>
                <Tr>
                  <Th>話</Th>
                  <Th>タイトル</Th>
                  <Th isNumeric>投稿日</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>一話</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          タブ機能
          <TableContainer w="80vw" borderWidth="medium" borderRadius={20} mt={20}>
            <Table variant='striped' colorScheme='gray' >
              <TableCaption placement="top">届いた感想・提案</TableCaption>
              <Thead>
                <Tr>
                  <Th>話</Th>
                  <Th>タイトル</Th>
                  <Th isNumeric>投稿日</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>一話</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
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

PostPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutNoFooter>
      {page}
    </LayoutNoFooter>
  )
}


export default PostPage