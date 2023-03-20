import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useGetApiResource } from '../../helper/network'
import CardList from '../../components/ProductComponents/CardList/CardList'
import LoadingComponent from '../../UiComponent/LoadingComponent/LoadingComponent'
import ErrorComponent from '../../UiComponent/ErrorComponent/ErrorComponent'
import EmptyComponent from '../../UiComponent/EmptyComponent/EmptyComponent'

import { saveNowUserDataAction } from '../../store/actions/actions'

import './ProductsPage.css'

const ProductsPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(saveNowUserDataAction())
    }
  }, [])

  const { statusRequest, data: arrProducts } = useGetApiResource(
    'https://fakestoreapi.com/products'
  )

  return <>{showCardList(arrProducts, statusRequest)}</>
}

export default ProductsPage

export const showCardList = (arrProducts, statusRequest) => {
  switch (statusRequest) {
    case 'loading':
      return <LoadingComponent />
    case 'error':
      return <ErrorComponent />
    case 'good':
      if (arrProducts && arrProducts.length === 0) {
        return <EmptyComponent />
      } else {
        return <CardList arrProducts={arrProducts} />
      }

    default:
      return <>error...</>
  }
}
