import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import { setLocalStorage } from '../helper/LocalStorage'

const store = createStore(rootReducer, composeWithDevTools())

store.subscribe(() => {
  setLocalStorage('store', store.getState().userReducer)
})

export default store
