import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { clickLikeAction } from '../../../store/actions/actions'
import { sliceString } from '../../../helper/sliceString'
import StarRating from '../StarRating/StarRating'

import likePng from './img/heart.png'

import './Card.css'
import { useDispatch, useSelector } from 'react-redux'

const Card = ({ id, title, price, image, rating, liked }) => {
  const [produktLiked, setProduktLiked] = useState(liked)
  const dispatch = useDispatch()

  const clickLike = () => {
    setProduktLiked((produktLiked) => !produktLiked)
    dispatch(clickLikeAction(id))
  }

  const styleLike = produktLiked
    ? { backgroundColor: 'pink' }
    : { backgroundColor: 'gray' }

  return (
    <div className='card-wrapper'>
      <div onClick={clickLike} style={styleLike} className='like'>
        <div className='like-img-wrapper'>
          <img src={likePng} alt='' className='img-max' />
        </div>
      </div>
      <div className='card-img-container'>
        <NavLink to={`/products/${id}`} className='card-img-wrapper'>
          <img src={image} alt='' className='img-card' />
        </NavLink>
      </div>
      <div className='card-title-wrapper'>
        <NavLink to={`/products/${id}`} className='card-title'>
          {sliceString(title, 46)}
        </NavLink>
      </div>

      <StarRating rate={rating.rate} />
      <div className='card-price'>price: {price}$</div>
    </div>
  )
}
export const LikeCard = ({ id, title, price, image, rating, liked }) => {
  const dispatch = useDispatch()

  const clickLike = () => {
    dispatch(clickLikeAction(id))
  }

  const styleLike = { backgroundColor: 'pink' }

  return (
    <div className='card-wrapper'>
      <div onClick={clickLike} style={styleLike} className='like'>
        <div className='like-img-wrapper'>
          <img src={likePng} alt='' className='img-max' />
        </div>
      </div>
      <div className='card-img-container'>
        <NavLink to={`/products/${id}`} className='card-img-wrapper'>
          <img src={image} alt='' className='img-card' />
        </NavLink>
      </div>
      <NavLink to={`/products/${id}`} className='card-title'>
        {sliceString(title, 46)}
      </NavLink>
      <StarRating rate={rating.rate} />
      <div className='card-price'>price: {price}$</div>
    </div>
  )
}

export default Card
