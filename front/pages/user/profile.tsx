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
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'

import { useCookies } from 'react-cookie';


// const UserHome: NextPage = () => {
const UserHome: NextPage = () => {
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
  // console.log(cookie.isLogin)
  // console.log(accsesToken)
  if (cookie.isLogin) {
    return (
      <>
        <Flex h="30vh" alignItems="center">
          <Text w="30vw" ml = {10}>img</Text>
          <Text>Username</Text>


        </Flex>
        <Tabs>
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Saved</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
              <p>one!</p>
              <p>one!</p>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
              <p>two!</p>
              <p>two!</p>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Link href="/snippets/">
          <Button>投稿</Button>
        </Link>
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

export default UserHome