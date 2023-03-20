import { useSelector } from 'react-redux'

export const ToggleLink = ({
  children,
  fuNonReg,
  fuReg = () => {},
  className,
}) => {
  const userRegistered = useSelector(
    (reducer) => reducer.userReducer.nowUser.userRegistered
  )

  const clickLink = () => {
    if (userRegistered) {
      fuReg()
    } else {
      fuNonReg()
    }
  }

  return (
    <div className={className} onClick={clickLink}>
      {children}
    </div>
  )
}
