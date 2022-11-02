import { useIsMobile } from "hooks/useIsMobile"
import { Text } from '@chakra-ui/react'
import { AppName } from "components/atoms/appName"
import { Flex, Spacer } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'

export const AppHeader: React.FC = () => {
  const isMobile = useIsMobile()
  return (
    <>
      <Flex justifyContent="center">
        <Text fontSize='50px' color='#F85ED2 '>
          GitNovel
        </Text>
        <Spacer />
        <Text fontSize='50px' color='black'>
          Novels Movies Comics Dramas
        </Text>
        <Spacer />
        <Text fontSize='50px' color='black'>
          Login
        </Text>
      </Flex>
      <Divider borderColor="black" />
    </>
  )
}