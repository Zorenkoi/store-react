export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key)

  if (data !== null) {
    return JSON.parse(data)
  }

  return {
    nowUser: createUser(),
    users: [],
    modals: {
      modalOpen: false,
      nameOpenModal: null,
    },
  }
}

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

function createUser() {
  return {
    userId: '',
    name: '',
    password: '',
    email: '',
    cart: [],
    arrLike: [],
    userRegistered: false,
  }
}
