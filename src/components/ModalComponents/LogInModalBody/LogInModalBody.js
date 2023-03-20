import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import {
  logInAction,
  closeModalAction,
  openModalAction,
} from '../../../store/actions/actions'

import { FormInput } from '../SignInModalBody/SignInModalBody'
import { validEmail } from '../SignInModalBody/SignInModalBody'

import './LogInModalBody.css'

const LogInModalBody = () => {
  const [styleErrorMessage, setStyleErrorMessage] = useState({
    display: 'none',
  })

  const dispatch = useDispatch()
  const users = useSelector((reducer) => reducer.userReducer.users)

  const getData = (passObj) => {
    const userPassValid = findUser(users, passObj.email, passObj.password)

    if (userPassValid) {
      setStyleErrorMessage({ display: 'none' })
      dispatch(logInAction(passObj))
      dispatch(closeModalAction())
    } else {
      setStyleErrorMessage({ display: 'block' })
    }
  }

  function findUser(users, email, password) {
    return users.find(
      (user) => user.email === email && user.password === password
    )
  }

  const toSignIn = () => {
    dispatch(openModalAction('signinmodal'))
  }

  return (
    <div className='login__wrapper'>
      <div style={styleErrorMessage} className='login-error'>
        Invalid password or email.<br></br> Please try again!
      </div>
      <LoginForm getData={getData} />
      <div onClick={toSignIn} className='sign__link'>
        to Sign In
      </div>
    </div>
  )
}

export default LogInModalBody

const LoginForm = ({ getData }) => {
  const [emailObj, setEmailObj] = useState({
    value: '',
    error: false,
    message: '',
  })

  const [passwordObj, setPasswordObj] = useState({
    value: '',
    error: false,
    message: '',
  })

  const changeEmail = (e) => {
    const value = e.target.value

    if (validEmail(value)) {
      setEmailObj({
        value,
        error: false,
        message: '',
      })
    } else {
      setEmailObj({
        value,
        error: true,
        message: 'email not valid',
      })
    }
  }

  const changePassword = (e) => {
    const value = e.target.value

    if (value.length < 8) {
      setPasswordObj({
        value,
        error: true,
        message: 'more than 8 characters',
      })
    } else {
      setPasswordObj({
        value,
        error: false,
        message: '',
      })
    }
  }

  const clickGetData = () => {
    if (!emailObj.error && !passwordObj.error) {
      if (emailObj.value.length !== 0 && passwordObj.value.length !== 0) {
        getData({
          password: passwordObj.value,
          email: emailObj.value,
        })
      }
    }
  }

  return (
    <div className='form__wrapper'>
      <FormInput {...emailObj} label={'email'} changeFu={changeEmail} />
      <FormInput
        {...passwordObj}
        label={'password'}
        changeFu={changePassword}
      />
      <button className='button' onClick={clickGetData}>
        Log In
      </button>
    </div>
  )
}
