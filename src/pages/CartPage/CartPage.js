import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { CartController } from '../../components/ProductComponents/CartController/CartController'
import { useGetApiResource } from '../../helper/network'
import { saveNowUserDataAction } from '../../store/actions/actions'
import { sliceString } from '../../helper/sliceString'

import EmptyComponent from '../../UiComponent/EmptyComponent/EmptyComponent'
import LoadingComponent from '../../UiComponent/LoadingComponent/LoadingComponent'
import ErrorComponent from '../../UiComponent/ErrorComponent/ErrorComponent'

import './CartPage.css'

const CartPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(saveNowUserDataAction())
    }
  }, [])

  const cartEmpty = useSelector((reducer) => {
    return reducer.userReducer.nowUser.cart.length === 0
  })

  if (cartEmpty) {
    return <EmptyComponent />
  } else {
    return (
      <div className='cartpage__wrapper'>
        <div className='cartpage__info__wrapper'>
          <CartInfo />
        </div>
        <div className='cartpage__card__wrapper'>
          <CartCardList />
        </div>
      </div>
    )
  }
}

export default CartPage

const CartCardList = () => {
  const cart = useSelector((reducer) => {
    return reducer.userReducer.nowUser.cart
  })

  const { statusRequest, data: arrProduct } = useGetApiResource(
    'https://fakestoreapi.com/products'
  )

  const getArrCard = (arrProduct, arrCart) => {
    const filteredArrObjCard = arrProduct.filter((product) => {
      return arrCart.find((cartProduct) => product.id === cartProduct.productId)
    })

    return (
      <div className='cart__card__list'>
        {filteredArrObjCard.map((product) => {
          return <Card key={product.id} {...product} />
        })}
      </div>
    )
  }

  if (cart.length === 0) return <EmptyComponent />

  switch (statusRequest) {
    case 'loading':
      return <LoadingComponent />
    case 'error':
      return <ErrorComponent />
    case 'good':
      return getArrCard(arrProduct, cart)
    default:
      return <ErrorComponent />
  }
}

const Card = ({ id, image, title, price }) => {
  return (
    <div className='cart__card__wrapper'>
      <div className='cart__img__wrapper'>
        <img src={image} alt='' className='img-cart' />
      </div>
      <div className='cart__card__info'>
        <div className='cart__card__text'>{sliceString(title, 46)}</div>
        <div className='cart__card__price'>price: {price}$</div>
        <CartController id={id} price={price} />
      </div>
    </div>
  )
}

const CartInfo = () => {
  const cart = useSelector((reducer) => {
    return reducer.userReducer.nowUser.cart
  })

  const getCartInfo = (cart) => {
    let totalPrice = 0
    let totalCount = 0

    cart.forEach((product) => {
      totalCount += product.count
      totalPrice += product.price * product.count
    })

    return { totalPrice, totalCount }
  }

  const { totalCount, totalPrice } = getCartInfo(cart)

  return (
    <div className='cart__info__wrapper'>
      <div className='info__flex'>
        <div className='info__label'>count products:</div>
        <div className='info__text'>{totalCount}</div>
      </div>
      <div className='info__flex'>
        <div className='info__label'>total price:</div>
        <div className='info__text'>{splicePrice(totalPrice)}$</div>
      </div>
    </div>
  )
}

function splicePrice(num) {
  const string = num + ''
  const indexDote = string.indexOf('.')

  if (indexDote > 0) {
    return string.slice(0, indexDote + 3)
  }

  return string
}
