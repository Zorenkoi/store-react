import { useSelector } from 'react-redux'
import { LikeCard } from '../../ProductComponents/Card/Card'
import EmptyComponent from '../../../UiComponent/EmptyComponent/EmptyComponent'
import LoadingComponent from '../../../UiComponent/LoadingComponent/LoadingComponent'
import './LikeCardList.css'
import ErrorComponent from '../../../UiComponent/ErrorComponent/ErrorComponent'

const LikeCardList = ({ arrProducts, statusRequest }) => {
  const arrLike = useSelector((reducer) => reducer.userReducer.nowUser.arrLike)

  if (arrLike.length === 0) return <EmptyComponent />

  switch (statusRequest) {
    case 'loading':
      return <LoadingComponent />
    case 'error':
      return <ErrorComponent />
    case 'good':
      return <ArrLikeCard arrProducts={arrProducts} arrLike={arrLike} />
    default:
      return <ErrorComponent />
  }
}

export default LikeCardList

const ArrLikeCard = ({ arrProducts, arrLike }) => {
  const filtereProducts = arrProducts.filter((product) => {
    return arrLike.find((id) => id === product.id)
  })

  return (
    <div className='cards-container'>
      {filtereProducts.map((cardObj, i) => {
        return <LikeCard {...cardObj} key={i} />
      })}
    </div>
  )
}
