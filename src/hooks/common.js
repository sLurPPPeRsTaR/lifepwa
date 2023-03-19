import { useEffect } from 'react'
import { useState } from 'react'

export const useBreakpoints = () => {
  const [isSm, setIsSm] = useState(false)
  const [isMd, setIsMd] = useState(false)
  const [isLg, setIsLg] = useState(false)
  const [isXl, setIsXl] = useState(false)

  const handleResize = (windowWidth) => {
    console.log('handleResize', windowWidth)
    if (windowWidth > 1024) {
      setIsXl(true)
      setIsLg(false)
      setIsMd(false)
      setIsSm(false)
      return
    } else if (windowWidth > 768 && windowWidth < 1024) {
      setIsLg(true)
      setIsXl(false)
      setIsMd(false)
      setIsSm(false)
      return
    } else if (windowWidth > 640 && windowWidth < 768) {
      setIsMd(true)
      setIsXl(false)
      setIsLg(false)
      setIsSm(false)
      return
    } else if (windowWidth < 640) {
      setIsSm(true)
      setIsXl(false)
      setIsLg(false)
      setIsMd(false)
      return
    }
  }

  useEffect(() => {
    handleResize(window.innerWidth)

    const unsub = () => handleResize(window.innerWidth)
    window.addEventListener('resize', unsub)
    return () => {
      window.removeEventListener('resize', unsub)
    }
  }, [handleResize])

  return {
    isSm,
    isMd,
    isLg,
    isXl
  }
}
