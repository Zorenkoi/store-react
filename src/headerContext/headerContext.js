import { useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'

const HeaderContext = createContext()

const HeaderProvider = ({ children }) => {
  const [headerOpen, setHeaderOpen] = useState(false)

  const closeHeader = () => {
    setHeaderOpen(false)
  }
  const openHeader = () => {
    setHeaderOpen(true)
  }

  return (
    <HeaderContext.Provider value={{ headerOpen, closeHeader, openHeader }}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = () => useContext(HeaderContext)

export default HeaderProvider
