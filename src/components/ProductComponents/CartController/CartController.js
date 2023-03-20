import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  addToCartAction,
  increaseCountProductAction,
  decreaseCountProductAction,
  openModalAction,
} from '../../../store/actions/actions'

import cartImg from './img/cart.png'

import './CartController.css'

export const CartController = ({ id, price }) => {
  const dispatch = useDispatch()

  const findProduct = useSelector((reducer) => {
    return reducer.userReducer.nowUser.cart.find(
      (product) => product.productId === id
    )
  })

  const clickPlus = () => {
    dispatch(increaseCountProductAction(id))
  }
  const clickMinus = () => {
    dispatch(decreaseCountProductAction(id))
  }
  const clickAdd = () => {
    dispatch(addToCartAction({ productId: id, price }))
  }

  return (
    <>
      {findProduct ? (
        <div className='cart__controller'>
          <div onClick={clickMinus} className='cart__button left__cart__button'>
            -
          </div>
          <div className='cart__counter'>{findProduct.count}</div>
          <div onClick={clickPlus} className='cart__button right__cart__button'>
            +
          </div>
        </div>
      ) : (
        <button className='cart__zero__button' onClick={clickAdd}>
          <div onClick={clickAdd} className='cart-controller-img-wrapper'>
            <img src={cartImg} alt='' className='img-max' />
          </div>
        </button>
      )}
    </>
  )
}
