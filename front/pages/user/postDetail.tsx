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
  Grid,
  GridItem,
  Spacer,
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
import axios from 'axios'
import { drfApiRoot } from "constants/drf"
import {
  useEffect,
} from 'react';


const PostPage = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accessToken, setAccessToken] = useCookies(['accessToken']);

  // const inputEl = useRef("")

  const [title, setTitle] = useState("")
  const [originUser, setOriginUser] = useState("")
  const [forkUser, setForkUser] = useState("")
  const [caption, setCaption] = useState("")
  const [content, setContent] = useState("")

  const onClickFork = () => {
    (async () => {
      console.log(originUser)
      await axios
        .post(
          // `${drfApiRoot}/post/fork/${title}`,
          `${drfApiRoot}/post/fork/`,
          {
            content, originUser, forkUser
            // title, content, originUser, forkUser
          },
          {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `JWT ${accessToken.accessToken}`
            }
          }
        ).then((res) => {
          alert("fork post")
          router.push("/user/")
        })
        .catch(err => {
          alert("failed to fork")
        })
    })()
  }

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `${drfApiRoot}/post/${router.query.id}/`,
          {
            headers: {
              'accept': 'application/json',
              'Authorization': `JWT ${accessToken.accessToken}`
            }
          }
        ).then((res) => {
          // setPostList(res.data.results)
          console.log(res.data)
          setCaption(res.data.caption)
          setTitle(res.data.title)
          setContent(res.data.content)
          setOriginUser(res.data.owner.userName)
        })
        .catch(err => {
          console.log(err)
          alert(err)
          console.error("failed to getList by axios")
        })
    })()
  }, []);
  useEffect(() => {
    (async () => {
      await axios
        .get(
          `${drfApiRoot}/auth/users/`,
          {
            headers: {
              'accept': 'application/json',
              'Authorization': `JWT ${accessToken.accessToken}`
            }
          }
        ).then((res) => {
          // setPostList(res.data.results)
          // console.log(res.data)
          setForkUser(res.data.results[0].userName)
          // setForkUser(res.data.results[0].email)
        })
        .catch(err => {
          console.log(err)
          alert(err)
          console.error("failed to getList by axios")
        })
    })()
  }, []);


  if (cookie.isLogin) {
    return (
      <Flex marginInline="10vw"
        flexDirection="column"
      >
        <ul>
          <li>title:{" " + router.query.title}</li>
          <li>titleRes:{" " + title}</li>
          <li>originname:{" " + router.query.userName}</li>
          <li>originnamefromRes:{" " + originUser}</li>
          <li>id:{" " + router.query.id}</li>
          <li>forkUser:{" " + forkUser}</li>
          <li>content:{" " + content}</li>
        </ul>
        
        <Box ml={20}> {router.query.userName} / {router.query.title}</Box>

        <Flex my={10}
        flexDirection="column" 
        alignItems="center"
        >
          <Flex justifyContent="end" w="100%">
              <FaPenNib onClick={onClickFork} size={30} />
              <AiOutlineHeart size={30} />
              <FaRegCommentDots size={30} />
            </Flex>
          <Flex fontSize="60px">
            {" " + router.query.title}
          </Flex>
          <Flex>履歴ツリー</Flex>
        
          <Flex w="100%"
            flexDirection="column" 
            justifyContent="end"
            my="2"
            >
            <Flex justifyContent="end" mr={20}>作者 : {router.query.userName}</Flex>
            <Flex justifyContent="end" mr={20}>タグ</Flex>
          </Flex>
          
          <Flex flexDirection="column" alignItems="center" >        
            {caption}
          </Flex>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <TableContainer w="80vw" borderWidth="medium" borderRadius={20}>
            <Table variant='striped' colorScheme='gray' >
              <TableCaption placement="top">  ー 連載中 ー</TableCaption>
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
              <TableCaption placement="top">ー 届いた感想・提案 ー</TableCaption>
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
      </Flex>
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