import { useIsMobile } from "hooks/useIsMobile"
import { useWindowSize } from "@/hooks/useWindowSize"
import { Button, Text } from '@chakra-ui/react'
import { AppName } from "components/atoms/appName"
import { Flex, Spacer } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons"

const AppHeader = () => {
  // const isMobile = useIsMobile()
  const { height, width } = useWindowSize();

  // 初期表示時に画面幅に合わないコンポーネントが一瞬表示されてしまうのを防ぐ
  if (width === null) {
    return ``
  }

  if (width < 1100) {
    return (
      <>
        <Flex justifyContent="center" alignContent="center">
          <Text fontSize='50px' color='brand' ml='10' width='200px'>
            GitNovel
          </Text>
          <Spacer />
          <Menu>
            <MenuButton
              fontSize="30px" fontWeight={"light"}
              display='flex' alignContent='center'
              mt='auto' mb='auto'
              as={Button} rightIcon={<ChevronDownIcon />}>
              Select
            </MenuButton>
            <MenuList>
              <MenuItem>Novels</MenuItem>
              <MenuItem>Movies</MenuItem>
              <MenuItem>Comics</MenuItem>
              <MenuItem>Dramas</MenuItem>
            </MenuList>
          </Menu>
          <Spacer />
          <Text fontSize='30px' color='black' mr='10'
            display='flex' alignItems='center' width='200px'
            justifyContent={"right"}>
            Login
          </Text>
        </Flex>
        <Divider borderColor="black" />
        画面サイズ取得見本
        height:{height} width:{width}
      </>
    )
  }

  return (
    <>
      <Flex justifyContent="center">
        <Text fontSize='50px' color='brand' ml='10' width='200px'>
          GitNovel
        </Text>

        <Spacer />

        <Flex align='center' ml='10' mr='10'>
          <Text fontSize='30px' mr='10' color='black'>
            Novels
          </Text>
          <Text fontSize='30px' mr='10' color='black'>
            Movies
          </Text>
          <Text fontSize='30px' mr='10' color='black'>
            Comics
          </Text>
          <Text fontSize='30px' color='black'>
            Drama
          </Text>
        </Flex>
        <Spacer />
        <Text fontSize='30px' color='black' mr='10'
          display='flex' alignItems='center' width='200px'
          justifyContent={"right"}>
          Login
        </Text>
      </Flex>
      <Divider borderColor="black" />
      画面サイズ取得見本
      height:{height} width:{width}
    </>
  )
}

export default AppHeader