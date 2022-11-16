import React, { useEffect, useRef, useState } from "react"
import { Container } from "@chakra-ui/layout"
import { HeaderBasic as Header } from "components/Organisms/HeaderBasic"
import { useRouter } from "next/router"
import { useBreakpointValue } from "@chakra-ui/react"
import { DesktopNavButton } from "components/atoms/button/DesktopNavButton"
import { Box, Flex, Grid, GridItem, IconButton, Icon } from "@chakra-ui/react"
import { DesktopNav } from "components/Molecules/DesktopNav"
import { useWindowSize } from "hooks/useWindowSize"
import { useScroll } from "hooks/useScroll"
import Head from "next/head"
import { useIsMobile } from "hooks/useIsMobile"
import {
  RiHome4Line,
  RiChatSmile2Line,
  RiNotification2Line,
  RiCalendarEventFill,
  RiNewspaperLine,
} from "react-icons/ri"
import { MobileFooterNav } from "components/Molecules/MobileFooterNav"

type Props = {
  children: React.ReactNode;
  showIcon?: boolean
}

type WindowDimnesions = {
  width: number
  height: number
}

export const AppBasic: React.FC<Props> = ({ children, showIcon = true }) => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const windowSize = useWindowSize()

  // const ref = useRef(null)
  // ref?.current.addEventListner
  // if (process.browser) {
  //   setTimeout(() => {
  //     window.scrollTo(2012, 3747)
  //     ref.current?.scrollTo(0, 3747)
  //   }, 1000)
  // }
  // if (process.browser) {
  //   window.addEventListener("onload", () => {})
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", (e) => {
  //     console.log(window.scrollY)
  //   })
  //   if (ref && ref.current) {
  //     // ref.current?.addEventListener("scroll", () => {
  //     //   console.log(ref.current?.pageYOffset)
  //     // })
  //     // window.scrollTo(0, 100)
  //     // ref.current?.scrollTo(0, 100)
  //   }
  // })

  const pages = [
    {
      path: "/",
      name: "ホーム",
      icon: RiHome4Line,
    },
    {
      path: "/test",
      name: "Unitter",
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

  return (
    <>
      <Container m={0} p={0} maxW={"container.2xl"}>
        <Grid
          templateAreas={{ md: `"nav main"` }}
          gridTemplateColumns={{ base: "unset", md: `${windowSize.width * 0.16}px 1fr` }}
        >
          {!isMobile && (
            <GridItem area={"nav"} borderRight={"2px groove #f3f3f35d"}>
              <DesktopNav routerPathName={router.pathname} />
            </GridItem>
          )}
          <GridItem area={"main"} overflowY={{ md: "scroll" }} zIndex={10}>
            <Box h={windowSize.height} pos={"relative"}>
              <Box
                pos={{ base: "fixed" }}
                top={{ base: 0 }}
                w={{ base: "100%", md: windowSize.width * 0.84 }}
                zIndex={"10000"}
              >
                <Header showIcon={showIcon} />
              </Box>
              <Box
                pt={{ base: `${windowSize.height * 0.08}px`, md: `${windowSize.height * 0.12}px` }}
                pb={{ base: `${windowSize.height * 0.08}px`, md: "unset" }}
              >
                {children}
              </Box>
              {isMobile && (
                <Box pos={"fixed"} bottom={0} w={"100vw"} zIndex="10000">
                  <MobileFooterNav pages={pages} />
                </Box>
              )}
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </>
  )
}