import type { NextPage } from 'next'
import Link from "next/link"
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { drfApiRoot } from "constants/drf"
import axios from 'axios';



// const UserHome: NextPage = () => {
const UserHome: NextPage = () => {
  const [postList, setPostList] = useState([])
  const [dragIndex, setDragIndex] = useState(null);

  const [cookie, setCookie] = useCookies(['isLogin'])
  const [accessToken, setAccessToken] = useCookies(['accessToken']);
  useEffect(() => {
    (async () => {
      await axios
        .get(
          `${drfApiRoot}/post/`,
          {
            headers: {
              'accept': 'application/json',
              'Authorization': `JWT ${accessToken.accessToken}`
            }
          }
        ).then((res) => {
          setPostList(res.data.results)
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
      <>
        <Flex flexDirection="column" alignItems="center">
          <p suppressHydrationWarning>MyPage</p>
          <Link href="/user/post">
            <Button>投稿</Button>
          </Link>
          <Text m={10}>投稿一覧(タイトル)</Text>
          {postList.map((post, index) => (
            <Box key={post.id} bg={useColorModeValue('white', 'gray.800')} boxShadow rounded fontSize={30} m={30}>
              {post.post_title}
            </Box>
          ))}
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

UserHome.getLayout = (page) => {
  return (
    page
  )
}


export default UserHome