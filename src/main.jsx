// import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router'
import { createRoot } from 'react-dom/client'


import './styles/index.css'
import App from './pages/App'
import { Provider } from 'react-redux'
// import App from './pages/Welcom'
import store from './store/index';
// import routes from '@/routers/routes'


createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  // </BrowserRouter>
)
