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


// const UserHome: NextPage = () => {
const UserHome: NextPage = () => {
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
  if (cookie.isLogin) {
    return (
      <>
        <Flex flexDirection = "column" alignItems = "center">
          <p suppressHydrationWarning>MyPage</p>
          <Link href="/user/post">
            <Button>投稿</Button>
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

UserHome.getLayout = (page) => {
  return (
    page
  )
}


export default UserHome