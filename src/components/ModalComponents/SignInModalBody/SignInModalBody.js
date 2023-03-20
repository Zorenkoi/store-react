import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uniq from 'uniqid'
import {
  closeModalAction,
  openModalAction,
} from '../../../store/actions/actions'
import { regUserAction } from '../../../store/actions/actions'
import './SignInModalBody.css'

const SignInModalBody = () => {
  const dispatch = useDispatch()

  const getData = (userObj) => {
    dispatch(regUserAction(userObj))
    dispatch(closeModalAction())
  }

  const toLogIn = () => {
    dispatch(openModalAction('loginmodal'))
  }

  return (
    <div className='sign__wrapper'>
      <SignInForm getData={getData} />
      <div onClick={toLogIn} className='sign__link'>
        to Log In
      </div>
    </div>
  )
}

const SignInForm = ({ getData }) => {
  const arrUserName = useSelector((reducer) =>
    reducer.userReducer.users.map((user) => user.name)
  )

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
  const [nameObj, setNameObj] = useState({
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

  const changeName = (e) => {
    const value = e.target.value

    const nameExist = arrUserName.find((userName) => userName === value)

    if (value.length < 3) {
      setNameObj({
        value,
        error: true,
        message: 'more than 3 characters',
      })
    } else if (nameExist) {
      setNameObj({
        value,
        error: true,
        message: 'name already axist',
      })
    } else {
      setNameObj({
        value,
        error: false,
        message: '',
      })
    }
  }

  const clickGetData = () => {
    if (!emailObj.error && !nameObj.error && !passwordObj.error) {
      if (
        emailObj.value.length !== 0 &&
        passwordObj.value.length !== 0 &&
        nameObj.value.length !== 0
      ) {
        getData({
          name: nameObj.value,
          password: passwordObj.value,
          email: emailObj.value,
        })
      }
    }
  }

  return (
    <div className='form__wrapper'>
      <FormInput {...nameObj} label={'name'} changeFu={changeName} />
      <FormInput {...emailObj} label={'email'} changeFu={changeEmail} />
      <FormInput
        {...passwordObj}
        label={'password'}
        changeFu={changePassword}
      />

      <button className='button' onClick={clickGetData}>
        Sign In
      </button>
    </div>
  )
}

export default SignInModalBody

export const FormInput = ({ error, value, message, label, changeFu }) => {
  const inputStyle = error
    ? { border: '2px solid rgb(234, 73, 33)' }
    : { border: '2px solid green' }
  const messageStyle = error ? { display: 'block' } : { display: 'none' }

  return (
    <div className='input__wrapper'>
      <div className='label'>{label}</div>
      <input
        style={inputStyle}
        onChange={changeFu}
        type='text'
        value={value}
        className='input'
      />
      <div style={messageStyle} className='message'>
        {message}
      </div>
    </div>
  )
}

export const validEmail = (value) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  return EMAIL_REGEXP.test(value)
}
