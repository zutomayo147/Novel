import React from "react"
import { Flex } from "@chakra-ui/layout"
import { useWindowSize } from "hooks/useWindowSize"

type Props = {
  children: React.ReactNode;
}

export const HeaderBase: React.FC<Props> = (props) => {
  const windowSize = useWindowSize()
  return (
    <Flex
      paddingX={4}
      w="100%"
      h={{ base: windowSize.height * 0.08, md: windowSize.height * 0.12 }}
      alignItems={"center"}
      bgColor="rgba(255, 255, 255, 0.8)"
      backdropFilter="saturate(180%) blur(5px)"
      position="sticky"
      top={0}
      zIndex={10}
    >
      {props.children}
    </Flex>
  )
}