import { Box, Flex, Icon, IconButton } from "@chakra-ui/react"
import { useWindowSize } from "hooks/useWindowSize"
import { useRouter } from "next/router"
import { IconType } from "react-icons/lib"

type Props = {
  pages: {
    path: string
    name: string
    icon: IconType
  }[]
}

export const MobileFooterNav: React.FC<Props> = (props) => {
  const { pages } = props
  const windowSize = useWindowSize()
  const router = useRouter()
  const clickHandler = (path: string) => {
    router.push(path)
  }
  return (
    <Box
      h={`${windowSize.height * 0.08}px`}
      borderTop={"2px groove #f3f3f35d"}
      borderTopRadius={"md"}
      backgroundColor="white"
    >
      <Flex alignItems={"center"} w={"100%"} h={"100%"} justifyContent={"space-evenly"}>
        {pages.map((page) => (
          <IconButton
            key={page.name}
            colorScheme={page.path === "/flyers" ? "linkedin" : ""}
            aria-label={page.name}
            variant={"ghost"}
            onClick={() => clickHandler(page.path)}
            icon={<Icon boxSize={"1.5em"} color={page.path === "/flyers" ? "linkedin" : "gray.600"} as={page.icon} />}
          ></IconButton>
        ))}
      </Flex>
    </Box>
  )
}