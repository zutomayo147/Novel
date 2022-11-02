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
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import AppHeader from "components/Molecules/AppHeader"
import { Textarea } from '@chakra-ui/react'



// const UserHome: NextPage = () => {
const PostPage: NextPage = () => {
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
  const [value, setValue] = React.useState('')

  // console.log(cookie.isLogin)
  // console.log(accsesToken)
  if (cookie.isLogin) {
    return (
      <>
        <AppHeader />
        <Flex flexDirection="column" alignItems="center">
          <Text>新規小説作成</Text>
          <Text>タイトル</Text>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-end">
          <Box mr="300px">
            <Text  >作者</Text>
            <Text>ジャンル</Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Text>中身</Text>
          <Link href="/snippets/">
            <Button>新規作成</Button>
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

PostPage.getLayout = (page) => {
  return (
    page
  )
}


export default PostPage