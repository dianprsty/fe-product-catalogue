import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const GuestRoute = () => {
  if (localStorage.getItem('token') !== null){
    return <Navigate to={'/'} replace />
  }
  return <Outlet />
}

export default GuestRoute
