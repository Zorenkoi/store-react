import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useGetApiResource, getApiResource } from '../../helper/network'
import { showCardList } from '../ProductsPage/ProductsPage'

import { saveNowUserDataAction } from '../../store/actions/actions'

import './CategoryPage.css'

const CategoryPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(saveNowUserDataAction())
    }
  }, [])

  const [statusRequest, setStatusRequest] = useState('loading')
  const [arrProducts, setArrProducts] = useState(null)

  const { categoryId } = useParams()

  useEffect(() => {
    setStatusRequest('loading')
    setArrProducts(null)

    getApiResource(`https://fakestoreapi.com/products/category/${categoryId}`)
      .then((data) => {
        setStatusRequest('good')
        setArrProducts(data)
      })
      .catch(() => {
        setStatusRequest('error')
      })
  }, [categoryId])

  return <>{showCardList(arrProducts, statusRequest)}</>
}

export default CategoryPage
