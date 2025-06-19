import { RouterProvider } from 'react-router'
import router from '../../routers/routes'

import './index.css'
import * as React from 'react'

function App() {
  return (
    <>
      {/* <Link to="/form">toForm</Link> */}
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
