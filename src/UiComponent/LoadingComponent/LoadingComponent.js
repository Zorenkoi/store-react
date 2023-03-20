import s from './LoadingComponent.module.css'
import blueLoading from './img/loadingBlue.svg'

const LoadingComponent = () => {
  return (
    <div className={s.loading__container}>
      <div className={s.loading__wrapper}>
        <img src={blueLoading} alt='' className={s.img__max} />
      </div>
    </div>
  )
}

export default LoadingComponent
