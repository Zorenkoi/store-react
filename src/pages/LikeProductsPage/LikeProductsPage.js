import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGetApiResource } from '../../helper/network'
import LikeCardList from '../../components/LikeProductsComponents/LikeCardList/LikeCardList'
import EmptyComponent from '../../UiComponent/EmptyComponent/EmptyComponent'
import { saveNowUserDataAction } from '../../store/actions/actions'
import './LikeProductsPage.css'

const LikeProductsPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(saveNowUserDataAction())
    }
  }, [])

  const { statusRequest, data: arrProducts } = useGetApiResource(
    'https://fakestoreapi.com/products'
  )

  return (
    <>
      <LikeCardList arrProducts={arrProducts} statusRequest={statusRequest} />
    </>
  )
}

export default LikeProductsPage
