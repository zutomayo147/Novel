import { useEffect, useState } from "react"

type Size = {
  width: number
  height: number
}

export const useWindowSize = (): Size => {
  const [windowSize, setDWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const onResize = () => {
      setDWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("resize", onResize)
    onResize()
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return windowSize
}