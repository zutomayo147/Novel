import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from "react"
import { AppBasic } from "components/Layouts/AppBasic"
import { CookiesProvider } from 'react-cookie';
import type { NextPage } from "next"
import theme from 'styles/theme'
import { RecoilRoot } from "recoil"
import React from 'react';
// import { ChakraProvider } from '@chakra-ui/react' for toast
import { ChakraProvider } from "@chakra-ui/provider";

// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }
// const theme = extendTheme({ colors })

// import { extendTheme } from "@chakra-ui/react";
//
// const theme = extendTheme({
//   styles: {
//     // グローバルなテーマの上書き、追加
//     global: {
//       body: {
//         // bodyに指定したいstyle
//         backgroundColor: "orange.50",
//         color: "gray.800",
//       },
//       p: {
//         // mdを境に、PCとSP表示を切り替える
//         fontSize: { base: "md", md: "lg" },
//         // 文字列の行の間隔
//         lineHeight: "tall",
//       },
//     },
//   },
// });
//
// export default theme;


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
        <ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
      </CookiesProvider>
    </RecoilRoot>
  )
}
export default MyApp