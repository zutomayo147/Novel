import { Button } from "@chakra-ui/button"
import { ButtonProps, BoxProps, Box } from "@chakra-ui/react"
import { ReactNode, useState, FC } from "react"

type Props = {
  children: ReactNode
  isSelected: boolean
  colorScheme: "linkedin" | "pink"
  onClick: () => void
}

export const DesktopNavButton: FC<Props> = (props) => {
  const { children, isSelected, colorScheme, onClick } = props
  //この編書き直せ
  const [boxIsHover, setBoxIsHover] = useState<boolean>(false)
  const variant = boxIsHover || isSelected ? "solid" : "ghost"
  const transform = boxIsHover || isSelected ? "" : "translateY(-2px)"

  const boxBaseStyle: BoxProps = {
    width: "100%",
    paddingLeft: "1.5em",
    _hover: {
      cursor: "pointer",
    },
  }

  const boxStyle = { ...boxBaseStyle }

  const buttonStyle: ButtonProps = {
    colorScheme: colorScheme,
    borderRadius: "full",
    variant: variant,
    textAlign: "left",
    px: "1.5em",
    _focus: {
      boxShadow: "none",
    },
    _hover: { transform: transform, boxShadow: "lg" },
  }

  return (
    <Box
      onMouseEnter={() => setBoxIsHover(true)}
      onMouseLeave={() => {
        setBoxIsHover(false)
      }}
      onClick={onClick}
      {...boxStyle}
    >
      <Button textAlign={"left"} isHovered={boxIsHover} {...buttonStyle}>
        {children}
      </Button>
    </Box>
  )
}