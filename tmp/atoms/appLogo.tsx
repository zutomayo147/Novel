import React from "react"
import Image from "next/image"
import logoImage from "public/GitHub.png"
import { useIsMobile } from "hooks/useIsMobile"

export const AppLogo: React.FC = () => {
  const isMobile = useIsMobile()
  return (
    <>
      <Image src={logoImage} alt="unipp Logo" width={isMobile ? 92 : 138} height={isMobile ? 38 : 57}></Image>
    </>
  )
}