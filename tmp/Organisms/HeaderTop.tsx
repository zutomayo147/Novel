import React from "react"
import Link from "next/link"
import { AppLogo } from "components/atoms/appLogo"
import { HeaderBase as Base } from "./HeaderBase"
import { Text, TextProps } from "@chakra-ui/react"
import { Spacer, Flex } from "@chakra-ui/layout"
import { useRouter } from "next/router"

type Props = {
  showIcon?: boolean
}

export const HeaderTop: React.FC<Props> = () => {
  const router = useRouter()
  const parentDirName = router.pathname.split("/")[1]
  const textStyle: TextProps = {
    _hover: {
      cursor: "pointer",
      color: "pink.600",
      transition: "color 0.5s ease",
    },
  }
  return (
    <>
      <Base>
        <AppLogo />
        <Spacer />
        <Flex gridGap={{ base: 1, md: 2 }} alignItems={"flex-end"}>
          {(parentDirName === "signIn" || parentDirName === "signUp") && (
            <Text hidden={router.pathname === "/"} fontSize={"xs"}>
              または
            </Text>
          )}
          {parentDirName !== "signIn" && (
            <>
              <Link href="/signIn">
                <Text {...textStyle} fontWeight={parentDirName === "signUp" ? "bold" : "unset"}>
                  ログイン
                </Text>
              </Link>
            </>
          )}
          {parentDirName !== "signUp" && (
            <Link href="/signUp/selectUniv">
              <Text fontWeight={"bold"} {...textStyle} color="">
                新規登録
              </Text>
            </Link>
          )}
        </Flex>
      </Base>
    </>
  )
}