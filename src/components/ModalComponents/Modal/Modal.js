import { useSelector, useDispatch } from 'react-redux'
import { closeModalAction } from '../../../store/actions/actions'
import SignInModalBody from '../SignInModalBody/SignInModalBody'
import LogInModalBody from '../LogInModalBody/LogInModalBody'
import LogOutModalBody from '../LogOutModalBody/LogOutModalBody'

import s from './Modal.module.css'

const Modal = () => {
  const dispatch = useDispatch()

  const { modalOpen, nameOpenModal } = useSelector(
    (reducer) => reducer.userReducer.modals
  )

  const styleModal = getShowStyle(modalOpen)
  const modalBody = getModalBody(nameOpenModal)

  const closeModal = () => {
    dispatch(closeModalAction())
  }

  return (
    <div style={styleModal} className={s.modal__wrapper}>
      <div onClick={closeModal} className={s.modal__background}></div>
      <div className={s.modal__body}>
        <div onClick={closeModal} className={s.close__modal}>
          x
        </div>
        {modalBody}
      </div>
    </div>
  )
}

export default Modal

export const getShowStyle = (modalOpen) => {
  if (modalOpen)
    return {
      visibility: 'visible',
      opacity: '1',
      pointerEvents: 'all',
    }

  return {
    visibility: 'hidden',
    opacity: '0',
    pointerEvents: 'none',
  }
}
export const getModalBody = (nameOpenModal) => {
  switch (nameOpenModal) {
    case 'signinmodal':
      return <SignInModalBody />
    case 'loginmodal':
      return <LogInModalBody />
    case 'logoutmodal':
      return <LogOutModalBody />

    default:
      break
  }
}
