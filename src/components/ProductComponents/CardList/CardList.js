import { useSelector } from 'react-redux'
import Card from '../Card/Card'
import './CardList.css'

const CardList = ({ arrProducts }) => {
  const arrLike = useSelector((reducer) => reducer.userReducer.nowUser.arrLike)
  const arrProductsWithLikeParams = arrProducts.map((product) => {
    const productId = product.id

    const productLiked = arrLike.find((id) => id === productId)

    return { ...product, liked: productLiked }
  })
  return (
    <div className='cards-container'>
      {arrProductsWithLikeParams.map((cardObj, i) => {
        return <Card {...cardObj} key={i} />
      })}
    </div>
  )
}

export default CardList
