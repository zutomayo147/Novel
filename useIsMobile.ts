import { useBreakpointValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true)
  const breakPoint = useBreakpointValue(["base", "sm", "md", "lg", "xl", "2xl"])

  useEffect(() => {
    const checkIsMobile = breakPoint === "base" || breakPoint === "sm"
    setIsMobile(checkIsMobile)
  }, [breakPoint])

  return isMobile
}
