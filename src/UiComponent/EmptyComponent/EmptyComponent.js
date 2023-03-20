import emptyImg from './img/empty.png'
import './EmptyComponent.css'

const EmptyComponent = () => {
  return (
    <div className='empty-container'>
      <div className={'empty-img-wrapper'}>
        <img src={emptyImg} alt='' className='img-max' />
      </div>
      <div className='empty-text-wrapper'>
        <div className='empty-text1'>Sorry. Empty</div>
      </div>
    </div>
  )
}

export default EmptyComponent
