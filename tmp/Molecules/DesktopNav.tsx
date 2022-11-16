import React from "react"
import { Box, Text } from "@chakra-ui/layout"
import { Flex, Spacer, VStack, Icon } from "@chakra-ui/react"
import { DesktopNavButton } from "components/atoms/button/DesktopNavButton"
import { useRouter } from "next/router"
import { AppLogo } from "components/atoms/appLogo"
import {
  RiHome4Line,
  RiChatSmile2Line,
  RiCalendarEventFill,
  RiNewspaperLine,
  RiNotification2Line,
  RiLogoutBoxLine,
} from "react-icons/ri"
import { useWindowSize } from "hooks/useWindowSize"

type Props = {
  routerPathName: string
}

export const DesktopNav: React.FC<Props> = (props) => {
  const { routerPathName } = props
  const router = useRouter()
  const windowSize = useWindowSize()
  const pages = [
    {
      path: "/test",
      name: "ユニッター",
      icon: RiChatSmile2Line,
    },
    {
      path: "/events",
      name: "イベント",
      icon: RiCalendarEventFill,
    },
    {
      path: "/flyers",
      name: "掲示板",
      icon: RiNewspaperLine,
    },
    {
      path: "/test",
      name: "通知",
      icon: RiNotification2Line,
    },
  ]
  const otherPage = [{ path: "/test", name: "ログアウト", icon: RiLogoutBoxLine }]
  return (
    <>
      <Flex h={windowSize.height} alignItems={"center"} justifyContent={"center"} flexDir={"column"} pos={"relative"}>
        <Box mt={6}>
          <AppLogo />
        </Box>
        <VStack align={"stretch"} h={"100%"} py={8} spacing={4} w={"100%"}>
          {pages.map((page, index) => {
            return (
              <DesktopNavButton
                key={index}
                colorScheme={"linkedin"}
                isSelected={routerPathName.includes(`${page.path}`)}
                onClick={() => router.push(page.path)}
              >
                <Icon mr={"1em"} as={page.icon} boxSize="1.5em" />
                <Text fontSize="md">{page.name}</Text>
              </DesktopNavButton>
            )
          })}
          <Spacer />
          {otherPage.map((page, index) => {
            return (
              <DesktopNavButton
                key={index}
                colorScheme={"pink"}
                isSelected={routerPathName.includes(`${page.path}`)}
                onClick={() => router.push(page.path)}
              >
                <Icon mr={"1em"} as={page.icon} boxSize="1.5em" />
                <Text fontSize="1em">{page.name}</Text>
              </DesktopNavButton>
            )
          })}
        </VStack>
      </Flex>
    </>
  )
}