import { Outlet} from 'react-router-dom'
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