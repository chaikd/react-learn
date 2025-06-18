// import { StrictMode } from 'react'
// import {BrowserRouter} from 'react-router'
import { createRoot } from 'react-dom/client'


import './styles/index.css'
import App from './pages/App'
// import App from './pages/Welcom'

createRoot(document.getElementById('root')).render(
  // <BrowserRouter router={routes}>
  // </BrowserRouter>
  <App />
)
