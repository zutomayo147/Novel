import React from "react"
import Link from "next/link"
import { AppLogo } from "../atoms/appLogo"
import { HeaderBase as Base } from "./HeaderBase"
import { Avatar, Text, IconButton, Icon } from "@chakra-ui/react"
import { Spacer, Flex } from "@chakra-ui/layout"
// import { userState } from "store/userState"
import { useRecoilValue } from "recoil"
import { RiMenuFill } from "react-icons/ri"
import { useIsMobile } from "hooks/useIsMobile"

type Props = {
  showIcon?: boolean
}

export const HeaderBasic: React.FC<Props> = () => {
  // const user = useRecoilValue(userState)
  const isMobile = useIsMobile()
  return (
    <>
      <Base>
        {isMobile && (
          <>
            <IconButton
              variant={"ghost"}
              aria-label="その他のメニュー"
              color={"gray.600"}
              icon={<Icon boxSize={"2em"} as={RiMenuFill} />}
            ></IconButton>
            <Spacer />
            <Flex alignItems="center">
              <AppLogo />
            </Flex>
          </>
        )}
        <Spacer />
        <Flex alignItems="center">
        </Flex>
      </Base>
    </>
  )
}