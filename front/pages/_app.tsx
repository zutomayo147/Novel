import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import type { ReactElement, ReactNode } from "react"
import { AppBasic } from "components/Layouts/AppBasic"
import { CookiesProvider } from 'react-cookie';
import type { NextPage } from "next"
import theme from 'styles/theme'
import { RecoilRoot } from "recoil"
import React from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => <AppBasic>{page}</AppBasic>)
  return (
    <RecoilRoot>
      <CookiesProvider>
        <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
      </CookiesProvider>
    </RecoilRoot>
  )
}
export default MyApp