import uniq from 'uniqid'

import { getLocalStorage } from '../../helper/LocalStorage'

const initialState = getLocalStorage('store')

const userReducer = (state = initialState, action) => {
  const { nowUser, users } = state

  let productId = null
  let updateNowUser = null
  let updateArrUsers = null
  let updateArrLikeNowUser = null
  let updateCartProducts = null
  const fuckUser = {
    userId: '',
    email: '',
    password: '',
    name: '',
    userRegistered: false,
    arrLike: [],
  }

  switch (action.type) {
    case 'addToCart':
      const productObj = action.payload
      const newProduct = { ...productObj, count: 1 }

      updateNowUser = { ...nowUser, cart: [...nowUser.cart, newProduct] }
      return { ...state, nowUser: updateNowUser }

    case 'increaseCountProduct':
      productId = action.payload
      updateNowUser = {
        ...nowUser,
        cart: nowUser.cart.map((product) => {
          if (product.productId === productId) {
            return { ...product, count: product.count + 1 }
          }
          return product
        }),
      }
      return { ...state, nowUser: updateNowUser }

    case 'decreaseCountProduct':
      productId = action.payload

      const findProduct = nowUser.cart.find(
        (cartProduct) => cartProduct.productId === productId
      )

      if (findProduct.count <= 1) {
        updateCartProducts = nowUser.cart.filter(
          (cartProduct) => cartProduct.productId !== productId
        )
      } else {
        updateCartProducts = nowUser.cart.map((product) => {
          if (product.productId === productId) {
            return { ...product, count: product.count - 1 }
          }
          return product
        })
      }

      updateNowUser = {
        ...nowUser,
        cart: updateCartProducts,
      }
      return { ...state, nowUser: updateNowUser }

    case 'clickLike':
      const idLikeProduct = action.payload

      const arrLikeNowUser = nowUser.arrLike
      const productLiked = arrLikeNowUser.find((id) => id === idLikeProduct)

      if (productLiked) {
        updateArrLikeNowUser = arrLikeNowUser.filter(
          (id) => id !== idLikeProduct
        )
      } else {
        updateArrLikeNowUser = [...arrLikeNowUser, idLikeProduct]
      }

      updateNowUser = { ...nowUser, arrLike: updateArrLikeNowUser }

      return { ...state, nowUser: updateNowUser }

    case 'regUser':
      const userObj = action.payload

      updateNowUser = {
        ...nowUser,
        ...userObj,
        userId: uniq(),
        userRegistered: true,
      }
      return {
        ...state,
        nowUser: updateNowUser,
        users: [...users, updateNowUser],
      }

    case 'logIn':
      const { email, password } = action.payload

      const findUser = users.find(
        (user) => user.password === password && user.email === email
      )

      updateNowUser = {
        ...findUser,
        cart: filterCart(findUser.cart, nowUser.cart),
      }

      updateArrUsers = users.map((user) => {
        if (updateNowUser.userId === user.userId) {
          return updateNowUser
        }
        return user
      })

      return { ...state, nowUser: updateNowUser, users: updateArrUsers }

    case 'logOut':
      updateNowUser = { ...nowUser, ...fuckUser }
      return { ...state, nowUser: updateNowUser }

    case 'saveNowUserData':
      if (nowUser.userRegistered) {
        updateArrUsers = users.map((user) => {
          if (user.userId === nowUser.userId) {
            return nowUser
          }
          return user
        })

        return { ...state, users: updateArrUsers }
      }

      return state

    case 'openModal':
      const nameModal = action.payload

      return {
        ...state,
        modals: {
          modalOpen: true,
          nameOpenModal: nameModal,
        },
      }
    case 'closeModal':
      return {
        ...state,
        modals: {
          modalOpen: false,
          nameOpenModal: null,
        },
      }

    default:
      return state
  }
}

export default userReducer

function filterArrLike(nowUserArrLike, findUserArrLike) {
  const startArr = [...nowUserArrLike, ...findUserArrLike]
  const uniqArr = []

  startArr.forEach((productId) => {
    const isExist = uniqArr.find((uniqProductId) => uniqProductId === productId)

    if (!isExist) uniqArr.push(productId)
  })

  return uniqArr
}

function filterCart(oldCart, newCart) {
  const mainCart = newCart

  oldCart.forEach((oldCartProduct) => {
    const isExist = mainCart.find(
      (mainCartProduct) =>
        oldCartProduct.productId === mainCartProduct.productId
    )

    if (!isExist) mainCart.push(oldCartProduct)
  })

  return mainCart
}
