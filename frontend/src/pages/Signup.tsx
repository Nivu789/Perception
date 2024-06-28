import React, { useEffect } from 'react'
import { Quote } from '../components/Quote'
import Auth from '../components/Auth'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
  
  const navigate = useNavigate()

  useEffect(()=>{
    const user = localStorage.getItem("token")
    if(user && user!==undefined){
      navigate('/blogs' ,{replace:true})
    }
  },[])

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
        <Auth type='Signup'/>
      </div>
      <div className='hidden lg:block'>
        <Quote/>
      </div>
    </div>
  )
}

export default Signup