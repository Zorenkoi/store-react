import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { useGetApiResource } from '../../helper/network'

import Header from '../../components/HeaderComponents/Header/Header'
import Modal from '../../components/ModalComponents/Modal/Modal'
import ProductsPage from '../ProductsPage/ProductsPage'
import LikeProductsPage from '../LikeProductsPage/LikeProductsPage'
import CategoryPage from '../CategoryPage/CategoryPage'
import CartPage from '../CartPage/CartPage'
import OneProductPage from '../OneProductPage/OneProductPage'
import Footer from '../../components/FooterComponents/Footer'

import { saveNowUserDataAction } from '../../store/actions/actions'

import './App.css'

function App() {
  const dispatch = useDispatch()

  // useEffect(() => {
  // window.onbeforeunload = () => {
  // dispatch(saveNowUserDataAction())
  // return 'Данные не сохранены. Точно перейти?'
  //   }
  // }, [])
  const { statusRequest, data } = useGetApiResource(
    'https://fakestoreapi.com/products'
  )

  return (
    <Router>
      <Header />
      <div className='content'>
        <Modal />
        <div className='wrapper'>
          <Routes>
            <Route path='/' element={<ProductsPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:productId' element={<OneProductPage />} />
            <Route
              path='/products/category/:categoryId'
              element={<CategoryPage />}
            />
            <Route path='/likeProducts' element={<LikeProductsPage />} />
            <Route path='/cart' element={<CartPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
