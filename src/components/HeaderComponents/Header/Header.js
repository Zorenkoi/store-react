import { useEffect, useRef, useState } from 'react'
import { CartLink, LikeLink, UserLink } from '../HeaderLinks/HeaderLinks'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import HeaderCatalog from '../HeaderCatalog/HeaderCatalog'
import { useHeader } from '../../../headerContext/headerContext'
import './Header.css'

const arrHeaderLink = [
  { componentName: 'HeaderCatalog', minHeaderWidth: 320, key: 0 },
  { componentName: 'LikeLink', minHeaderWidth: 380, key: 3 },
  { componentName: 'UserLink', minHeaderWidth: 430, key: 2 },
  { componentName: 'CartLink', minHeaderWidth: 0, key: 1 },
  { componentName: 'ThemeToggle', minHeaderWidth: 485, key: 4 },
]

const Header = () => {
  const headerRef = useRef()
  const { headerOpen, closeHeader, openHeader } = useHeader()

  const [arrMenu, setArrMenu] = useState([])
  const [arrHeader, setArrHeader] = useState([])

  useEffect(() => {
    sortLink()
    window.addEventListener('resize', sortLink)
  }, [])

  const sortLink = () => {
    const headerWidth = headerRef.current.offsetWidth

    const interimArrHeader = []
    const interimArrMenu = []

    arrHeaderLink.forEach(({ minHeaderWidth, componentName, key }) => {
      if (minHeaderWidth < headerWidth) {
        const linkWithoutText = createLink(componentName, false, key)
        interimArrHeader.push(linkWithoutText)
      } else {
        const linkWithText = createLink(componentName, true, key)
        interimArrMenu.push(linkWithText)
      }
    })

    setArrHeader(interimArrHeader)
    setArrMenu(interimArrMenu)
  }

  const createLink = (componentName, inMenu, key) => {
    switch (componentName) {
      case 'CartLink':
        return <CartLink inMenu={inMenu} key={key} />
      case 'UserLink':
        return <UserLink inMenu={inMenu} key={key} />
      case 'LikeLink':
        return <LikeLink inMenu={inMenu} key={key} />
      case 'HeaderCatalog':
        return <HeaderCatalog inMenu={inMenu} key={key} />
      case 'ThemeToggle':
        return <ThemeToggle inMenu={inMenu} key={key} />

      default:
        break
    }
  }

  const clickBurger = () => {
    if (headerOpen) {
      closeHeader()
    } else {
      openHeader()
    }
  }

  const classHeaderMenu = headerOpen ? 'header-menu active' : 'header-menu'
  const classBurger = arrMenu.length === 0 ? 'buger hide' : 'burger show'

  return (
    <div ref={headerRef} className='header'>
      <div onClick={clickBurger} className={classBurger}>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
      <div className={classHeaderMenu}>
        <div onClick={closeHeader} className='chest'>
          x
        </div>
        {arrMenu.map((el) => el)}
      </div>
      <div className='header-content'>{arrHeader.map((el) => el)}</div>
    </div>
  )
}

export default Header
