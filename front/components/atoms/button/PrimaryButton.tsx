import { Button } from "@chakra-ui/button"
import { ReactNode, FC } from "react"

type Props = {
  children: ReactNode
  disabled?: boolean
  onClick: () => void
}

export const PrimaryButton: FC<Props> = (props) => {
  const { children, disabled = false, onClick } = props
  return (
    <Button color="white" bg="#4e4e4e" _hover={{ opacity: 0.8 }} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  )
}