import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App/App'
import { Provider } from 'react-redux'
import store from './store/store'
import HeaderProvider from './headerContext/headerContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HeaderProvider>
        <App />
      </HeaderProvider>
    </Provider>
  </React.StrictMode>
)
