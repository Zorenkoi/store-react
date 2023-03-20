import { useState } from 'react'

import moonImg from './images/moon.png'
import sunImg from './images/sun.png'

import { changeCssTheme } from '../../../helper/changeCssTheme'

import './ThemeToggle.css'

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((theme) => {
      switch (theme) {
        case 'light':
          changeCssTheme('dark')
          return 'dark'
        case 'dark':
          changeCssTheme('light')
          return 'light'

        default:
          break
      }
    })
  }

  const styleToggleCircle =
    theme === 'light' ? { left: '-10%' } : { left: '60%' }
  const img = theme === 'light' ? sunImg : moonImg
  return (
    <div className='toggle__wrapper'>
      <div onClick={toggleTheme} className='toggle__line'>
        <div style={styleToggleCircle} className='toggle__circle'>
          <div className='toggle__circle-img-wrapper'>
            <img src={img} alt='' className='img-max' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle
