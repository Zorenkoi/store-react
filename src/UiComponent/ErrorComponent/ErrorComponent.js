import s from './ErrorComponent.module.css'
import errorImg from './img/error.svg'

const ErrorComponent = () => {
  return (
    <div className={s.error__container}>
      <div className={s.error__img__wrapper}>
        <img src={errorImg} alt='' className={s.img__max} />
      </div>
      <div className={s.error__text__wrapper}>
        <div className={s.error__text1}>error!</div>
        <div className={s.error__text2}>please reload</div>
      </div>
    </div>
  )
}

export default ErrorComponent
