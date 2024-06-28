import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import BaseLayout from '../pages/BaseLayout'
import { useRecoilValue } from 'recoil'
import { authState } from '../atoms/authAtom'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    
    const isAuthenticated = useRecoilValue(authState)
    console.log(isAuthenticated)

    if(!isAuthenticated){
        return <Navigate to={'/'}/>
    }

    console.log("protected rendered")
    
  return (
    <BaseLayout>
        <Outlet/>
    </BaseLayout>
  )
}

export default ProtectedRoute