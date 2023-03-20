import cart from '../images/cart.png'
import heart from '../images/heart.png'
import user from '../images/user.png'

import {
  openModalAction,
  saveNowUserDataAction,
} from '../../../store/actions/actions'
import { useDispatch } from 'react-redux'
import { ToggleLink } from '../ToggleLink/ToggleLink'
import { NavLink, useNavigate } from 'react-router-dom'
import { useHeader } from '../../../headerContext/headerContext'
import './HeaderLinks.css'

export const CartLink = ({ inMenu }) => {
  const { closeHeader } = useHeader()
  const linkClass = getLinkClass(inMenu)

  return (
    <NavLink to={'./cart'} className={linkClass}>
      <div className='link-body' onClick={closeHeader}>
        <div className='link-text'>cart</div>
        <div className='link-img-container'>
          <div className='link-img-wrapper'>
            <img src={cart} alt='' className='img-max' />
          </div>
        </div>
      </div>
    </NavLink>
  )
}
export const UserLink = ({ inMenu }) => {
  const { closeHeader } = useHeader()
  const linkClass = getLinkClass(inMenu)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fuNonReg = () => {
    dispatch(openModalAction('signinmodal'))
  }
  const fuReg = () => {
    dispatch(openModalAction('logoutmodal'))
  }

  return (
    <ToggleLink fuReg={fuReg} fuNonReg={fuNonReg} className={linkClass}>
      <div className='link-body' onClick={closeHeader}>
        <div className='link-text'>account</div>
        <div className='link-img-container'>
          <div className='link-img-wrapper'>
            <img src={user} alt='' className='img-max' />
          </div>
        </div>
      </div>
    </ToggleLink>
  )
}
export const LikeLink = ({ inMenu }) => {
  const { closeHeader } = useHeader()
  const linkClass = getLinkClass(inMenu)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fuNonReg = () => {
    dispatch(openModalAction('signinmodal'))
    dispatch(saveNowUserDataAction())
  }
  const fuReg = () => {
    navigate('./likeProducts')
    dispatch(saveNowUserDataAction())
  }

  return (
    <ToggleLink fuReg={fuReg} fuNonReg={fuNonReg} className={linkClass}>
      <div className='link-body' onClick={closeHeader}>
        <div className='link-text'>like products</div>
        <div className='link-img-container'>
          <div className='link-img-wrapper'>
            <img src={heart} alt='' className='img-max' />
          </div>
        </div>
      </div>
    </ToggleLink>
  )
}

const getLinkClass = (inMenu) => {
  return inMenu ? 'link-wrapper show-text' : 'link-wrapper hide-text'
}
