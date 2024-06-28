import { ReactNode } from 'react'
import Appbar from '../components/Appbar'

const BaseLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Appbar/>
            {children}
    </div>
  )
}

export default BaseLayout