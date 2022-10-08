import React from "react"
import { HeaderTop } from "components/Organisms/HeaderTop"
import { Container, Box } from "@chakra-ui/react"

// interface Props {
//   children: React.ReactNode;
// }
type Props = {
  children: React.ReactNode;
}

export const AppTop: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Container maxW={"container.2xl"} p={0}>
        <HeaderTop />
        <Box>{children}</Box>
      </Container>
    </>
  )
}