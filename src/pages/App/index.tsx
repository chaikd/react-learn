import { RouterProvider } from 'react-router'
import router from '@/routers/routes'

import './index.css'
import * as React from 'react'

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
