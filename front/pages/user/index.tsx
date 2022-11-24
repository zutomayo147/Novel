// import type { NextPage } from 'next'
import Link from "next/link"
import { ChangeEvent, ReactElement, ReactNode } from "react"
// import { LayoutNoFooter } from "components/Layouts/LayoutNoFooter"
import { Layout } from "components/Layouts/Layout"
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
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { useCookies } from 'react-cookie';
import {
  useEffect,
  useState,
  useRef
} from 'react';
import { drfApiRoot } from "constants/drf"
import axios from 'axios'
import { AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import { FaHotjar, FaSplotch, FaHistory } from "react-icons/fa";


type Post = {
  id: number;
  // post_title: string;
  // post_caption: string | null;
  // post_content: string
  title: string;
  caption: string | null;
  content: string
  owner: Array<string>
};


// const UserHome: NextPage = () => {
const UserHome = () => {
  const [postList, setPostList] = useState<Post[]>([])
  const [title, setTitle] = useState("ii")

  const router = useRouter();
  const [cookie, setCookie] = useCookies(['isLogin'])
  const [accessToken, setAccessToken] = useCookies(['accessToken']);

  // const query = {
  //   title: title,
  // };
  const handleClick = (clickedPost: Post) => {
    console.log(clickedPost.title);
    const query = {
      title: clickedPost.title,
      userName: clickedPost.owner.userName,
      id: clickedPost.id
    };
    // setTitle(clickedPost.title)
    // console.log(clickedPost.title)
    router.push({ pathname: "/user/postDetail", query: query }, "/user/postDetail");
  }
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
  // <Button onClick={handleOnClick}>pp</Button>
  if (cookie.isLogin) {
    return (
      <>
        <Flex h="5vh" m={5} justifyContent="center" fontSize="2xl" alignItems="center" fontStyle="italic">
          Home
        </Flex>

        <Flex h="70vh">
          <Flex w="150px" flexDirection="column" >
            <Flex ml={10}>
              <Text mb={5}>急上昇</Text>
              <FaHotjar />
            </Flex>
            <Flex ml={10}>
              <Text mb={5}>お気に入り</Text>
              <FaSplotch />
            </Flex>
            <Flex ml={10}>
              <Text mb={5}>履歴</Text>
              <FaHistory />
            </Flex>
          </Flex>

          <Flex flexWrap="wrap" w="80vw">
            <Text w="80vw" m={1} fontSize="2xl" >New Post List</Text>
            {postList.map((post, index) => (
              <Center py={6} key={post.id} onClick={() => handleClick(post)}>
                <Link href="/user/postDetail">
                  <Box
                    maxW={'320px'}
                    w={'full'}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                      {post.title}
                    </Heading>
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                      作者 {post.owner.userName}
                    </Heading>
                    <Text
                      textAlign={'center'}
                      px={3}>
                      概要 {post.caption}
                    </Text>
                    <Text mt = {10}>ダミータグ</Text>
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
                  </Box>
                </Link>
              </Center>
            ))}
            <Divider borderColor="black" />
            <Text w="80vw" m={1} fontSize="2xl" >Weekly Lanking まだ</Text>
            モック用スケルトン
            <Skeleton m={10}>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton m={10}>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
          </Flex>
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
UserHome.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default UserHome