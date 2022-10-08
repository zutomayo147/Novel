import type { NextPage } from 'next'
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


const userHome: NextPage = () => {
  const [cookie, setCookie] = useCookies(['isLogin']);
  console.log(cookie.isLogin)
  console.log(typeof (cookie.isLogin))
  // <Text>MyPage</Text>
  // if (cookie.isLogin === "true") {
  if (cookie) {
    return <span>MyPage</span>
  } else {
    return <span>No Cookie</span>
  }
}

export default userHome