// import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
// import { IconButton } from "@chakra-ui/button"
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
// import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout"
// import { PrimaryButton } from "components/atoms/button/PrimaryButton"
// import { useSignIn } from "hooks/useSignIn"
// import { AppTop } from "components/Layouts/AppTop"

import { Button, ButtonGroup } from '@chakra-ui/react'
// import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Link from "next/link"
import { NextPage } from "next"
// import { ChangeEvent, ReactElement, ReactNode, useState } from "react"
import { ReactElement } from "react"

const Home = () => {
  // const setUserData = useSetRecoilState(userState);
  // const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  // const [loading, setLoading] = React.useState(auth);
  //
  // useEffect(() => {
  //   // console.log(loggedIn);
  //   if (checkToken()) {
  //     setLoggedIn(true);
  //     setLoading(false);
  //     const token = fetchToken();
  //     fetch(serverConfig.serverURL + serverConfig.routes.fetchUser, {
  //       method: "GET",
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       credentials: 'same-origin',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token.token}`
  //       },
  //       redirect: 'follow',
  //       referrerPolicy: 'no-referrer',
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         setUserData(res.user);
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  //
  // }, [auth, authFallback, loggedIn, setLoggedIn, setUserData])

  return (
    //     <>
    //   {loading ? <Loading /> : (
    //     <>
    //       {/* Fallback Redirect */}
    //       {auth && !loggedIn ? <Redirect to={authFallback} /> : (<>
    //
    //         <Head>
    //           <title>{title} | NightKit</title>
    //         </Head>
    //         <div>
    //           <Nav />
    //           <div className="container flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">  {/* container my-6 */}
    //             {children}
    //           </div>
    //         </div>
    //
    //       </>)}
    //
    //     </>
    //   )}
    // </>

    <>
      <Flex flexDirection='column' alignItems='center' >
        <Text>ランディングページ</Text>
        <Link href="/signUp">
          <Button colorScheme='teal' variant='solid'>
            signUp
          </Button>
        </Link>
        <Link href="/signIn">
          <Button colorScheme='teal' variant='outline'>
            signIn
          </Button>
        </Link>
      </Flex>
    </>
  )
}
Home.getLayout = (page: ReactElement) => {
  return (
    page
  )
}

export default Home