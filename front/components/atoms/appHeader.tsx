import { useIsMobile } from "hooks/useIsMobile"
import { Text } from '@chakra-ui/react'

export const AppName: React.FC = () => {
  const isMobile = useIsMobile()
  return (
    <>
      <Text fontSize='50px' color='#F85ED2 '>
        GitNovel
      </Text>
    </>
  )
}