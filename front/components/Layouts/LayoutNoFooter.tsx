import { Footer } from './Footer'
import { FC, ReactNode } from 'react'
import { Header } from './Header'
import { Box, Flex, Spacer } from '@chakra-ui/react'


type Props = {
  children: ReactNode
}

export const LayoutNoFooter: FC<Props> = ({ children }) => {
  return (
    <Flex direction="column" w="100vw" h="100vh">
      <Header />
      <Box>
        <main>{children}</main>
      </Box>
    </Flex>
  )
}