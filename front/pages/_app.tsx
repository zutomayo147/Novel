import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from "react"
import { CookiesProvider } from 'react-cookie';
import type { NextPage } from "next"
import customTheme from 'styles/theme'
// import { RecoilRoot } from "recoil"
import React from 'react';
// import { ChakraProvider } from '@chakra-ui/react' for toast
import { ChakraProvider } from "@chakra-ui/provider";
import '@nextcss/reset';
import 'ress'


// import Head from 'next/head'


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // const getLayout = Component.getLayout ?? ((page) => page)
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <CookiesProvider>
        <ChakraProvider theme={customTheme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </CookiesProvider>
    </>
  )
}
export default MyApp