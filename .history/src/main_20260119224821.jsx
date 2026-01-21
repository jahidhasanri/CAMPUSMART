import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './router/Router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
     <>
      <RouterProvider router={Router} />
       <ToastContainer /> 
     </>
    </AuthProvider>
  </StrictMode>,
)
