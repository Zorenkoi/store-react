export const openModalAction = (nameModal) => {
  return {
    type: 'openModal',
    payload: nameModal,
  }
}
export const closeModalAction = () => {
  return {
    type: 'closeModal',
  }
}
export const clickLikeAction = (likeId) => {
  return {
    type: 'clickLike',
    payload: likeId,
  }
}

export const addToCartAction = (productObj) => {
  return {
    type: 'addToCart',
    payload: productObj,
  }
}
export const increaseCountProductAction = (productId) => {
  return {
    type: 'increaseCountProduct',
    payload: productId,
  }
}

export const decreaseCountProductAction = (productId) => {
  return {
    type: 'decreaseCountProduct',
    payload: productId,
  }
}

export const regUserAction = (userObj) => {
  return {
    type: 'regUser',
    payload: userObj,
  }
}
export const logOutAction = () => {
  return {
    type: 'logOut',
  }
}
export const logInAction = ({ email, password }) => {
  return {
    type: 'logIn',
    payload: { email, password },
  }
}
export const saveNowUserDataAction = () => {
  return {
    type: 'saveNowUserData',
  }
}
