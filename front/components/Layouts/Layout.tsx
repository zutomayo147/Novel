import { Footer } from './Footer'
import { FC, ReactNode } from 'react'
import { Header } from './Header'
import { Flex, Spacer } from '@chakra-ui/react'


type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Flex flexDirection="column" h = "100vh">
      <Header />
      <main>{children}</main>
      <Spacer/>
      <Footer />
    </Flex>
  )
}