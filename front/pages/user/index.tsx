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
  Center,
  Badge,
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import {
  useEffect,
  useState,
  useRef
} from 'react';
import { drfApiRoot } from "constants/drf"
import axios from 'axios';
import { AiOutlineHeart } from "react-icons/ai";



// const UserHome: NextPage = () => {
const UserHome: NextPage = () => {
  const [postList, setPostList] = useState([])
  const [dragIndex, setDragIndex] = useState(null);
  const inputEl = useRef("")
  // const handleOnClick = () => console.log(inputEl.current.textContent)
  const handleOnClick = () => console.log(inputEl.current)


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
          <Text m={10} onClick={handleOnClick}>投稿一覧(タイトル)</Text>
          <Button onClick={handleOnClick}>pp</Button>
          {postList.map((post, index) => (

            <Center ref={inputEl} py={6} key={post.id}>
              <Link href="/user/postDetail">
                <Box
                  maxW={'320px'}
                  w={'full'}
                  boxShadow={'2xl'}
                  rounded={'lg'}
                  p={6}
                  textAlign={'center'}>
                  <Heading fontSize={'2xl'} fontFamily={'body'} onClick={handleOnClick}>
                    {post.post_title}
                  </Heading>
                  <Text fontWeight={600} color={'gray.500'} mb={4}>
                    @lindsey_jam3s
                  </Text>
                  <Text
                    textAlign={'center'}
                    px={3}>
                    {post.post_caption}
                  </Text>
                  <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                      px={2}
                      py={1}
                      fontWeight={'400'}>
                      #art
                    </Badge>
                    <Badge
                      px={2}
                      py={1}
                      fontWeight={'400'}>
                      #photography
                    </Badge>
                    <Badge
                      px={2}
                      py={1}
                      fontWeight={'400'}>
                      #music
                    </Badge>
                  </Stack>
                  {post.post_content}
                  <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                      flex={1}
                      fontSize={'sm'}
                      rounded={'full'}
                      _focus={{
                        bg: 'gray.200',
                      }}>
                      Edit
                    </Button>
                    <Button
                      flex={1}
                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'red.500',
                      }}>
                      <AiOutlineHeart />
                    </Button>
                  </Stack>
                </Box>
              </Link>
            </Center>
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