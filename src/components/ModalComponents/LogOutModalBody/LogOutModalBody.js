import { useDispatch } from 'react-redux'
import { logOutAction, closeModalAction } from '../../../store/actions/actions'
import logoutImg from './img/logout.png'
import './LogOutModalBody.css'

const LogOutModalBody = () => {
  const dispatch = useDispatch()
  const clickLogOut = () => {
    dispatch(logOutAction())
    dispatch(closeModalAction())
  }
  return (
    <div className='logout__wrapper'>
      <button onClick={clickLogOut} className='logout__button'>
        <div className='logout__button-text'>log out</div>
        <div className='logout__button-img-wrapper'>
          <img src={logoutImg} alt='' className='img-max' />
        </div>
      </button>
    </div>
  )
}

export default LogOutModalBody
