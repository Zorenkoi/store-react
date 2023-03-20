import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useGetApiResource } from '../../helper/network'
import { CartController } from '../../components/ProductComponents/CartController/CartController'
import { saveNowUserDataAction } from '../../store/actions/actions'
import LoadingComponent from '../../UiComponent/LoadingComponent/LoadingComponent'
import ErrorComponent from '../../UiComponent/ErrorComponent/ErrorComponent'

import StarRating from '../../components/ProductComponents/StarRating/StarRating'

import './OneProductPage.css'

const OneProductPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(saveNowUserDataAction())
    }
  }, [])

  const testId = useParams().productId
  const { statusRequest, data: productObj } = useGetApiResource(
    `https://fakestoreapi.com/products/${testId}`
  )

  return <>{showOneProduct(productObj, statusRequest)}</>
}
export default OneProductPage

export const showOneProduct = (productObj, statusRequest) => {
  switch (statusRequest) {
    case 'loading':
      return <LoadingComponent />
    case 'error':
      return <ErrorComponent />
    case 'good':
      return <OneProductView {...productObj} />
    default:
      return <ErrorComponent />
  }
}

const OneProductView = (productObj) => {
  return (
    <>
      <OneProductViewV1 {...productObj} />
      <OneProductViewV2 {...productObj} />
    </>
  )
}

const OneProductViewV1 = ({ id, description, image, price, rating, title }) => {
  return (
    <div className='product__wrapper-bigscreen'>
      <div className='product__img__wrapper'>
        <img src={image} alt='' className='product-img' />
      </div>
      <div className='product__info'>
        <div className='product__header'>{title}</div>
        <StarRating rate={rating.rate} />
        <div className='product__label'>description:</div>
        <div className='product__page__description'>{description}</div>
        <div className='price'>price: {price}$</div>
        <CartController id={id} price={price} />
      </div>
    </div>
  )
}
const OneProductViewV2 = ({ id, description, image, price, rating, title }) => {
  return (
    <div className='product__wrapper-smallscreen'>
      <div className='product__img__wrapper'>
        <img src={image} alt='' className='product-img' />
      </div>
      <div className='product-info1'>
        <div className='product__header'>{title}</div>
        <StarRating rate={rating.rate} />
      </div>

      <div className='product-info2'>
        <div className='product__label'>description:</div>
        <div className='product__page__description'>{description}</div>
      </div>
      <div className='product-info3'>
        <div className='price'>price: {price}$</div>
        <CartController id={id} price={price} />
      </div>
    </div>
  )
}
