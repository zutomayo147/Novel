import { useIsMobile } from "hooks/useIsMobile"
import { useWindowSize } from "@/hooks/useWindowSize"
import { Button, Text } from '@chakra-ui/react'
import { AppName } from "components/atoms/appName"
import { Flex, Stack,Spacer } from '@chakra-ui/react'
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
  const isMobile = useIsMobile()
  const { height, width } = useWindowSize();

  // 初期表示時に画面幅に合わないコンポーネントが一瞬表示されてしまうのを防ぐ
  if (width === null) {
    return ``
  }


    return(
      <>
        <Flex justifyContent="center" alignContent="center">
        <Text fontSize='50px' color='brand' ml='5' mr='5' width='200px'>
            GitNovel
          </Text>
          <Spacer />
          {!isMobile && (
            <Flex align='center' ml='5'>
              <Stack direction='row' h='60px' p={2}>
                <Text fontSize='30px' color='black'>
                Novels
                </Text>
                <Divider orientation='vertical' />
                <Text fontSize='30px' color='black'>
                  Movies
                </Text>
                <Divider orientation='vertical' />
                <Text fontSize='30px' color='black'>
                  Comics
                </Text>
                <Divider orientation='vertical' />
                <Text fontSize='30px' color='black'>
                  Drama
                </Text>
              </Stack>
            </Flex>
          )}
          {isMobile &&(
            <Menu>
              <MenuButton
              fontSize="30px" fontWeight={"light"}
              display='flex' backgroundColor='white'
              mt='auto' mb='auto'
              minWidth='' /*これやるとrightIconが潰れない*/
              as={Button} rightIcon={<ChevronDownIcon />}>
                Menu
              </MenuButton>
              <MenuList>
                <MenuItem>Novels</MenuItem>
                <MenuItem>Movies</MenuItem>
                <MenuItem>Comics</MenuItem>
                <MenuItem>Dramas</MenuItem>
              </MenuList>
            </Menu>
          )}
          <Spacer />
          <Text fontSize='20px' color='black' ml='5' mr='10'
          display='flex' alignItems='center' width='200px'
          justifyContent={"right"}>
            Login
          </Text>
        </Flex>
        <Divider borderColor="black" />
        画面サイズ取得
        height:{height} width:{width}
      </>
    )

}

export default AppHeader