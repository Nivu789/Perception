import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {SignupType} from '@nived789/common'
import axios from 'axios'
import {BASE_URL} from '../config/config'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authState } from '../atoms/authAtom'

 
const Auth = ({type}:{type:"Signup"|"Sign in"}) => {
  const [postInputs,setPostInputs] = useState<SignupType>({
    email:"",
    password:"",
    name:""
  })

  const setUser = useSetRecoilState(authState)

  const navigate = useNavigate()
  const sendRequest = async()=>{
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user/${type=="Sign in"?"signin":"signup"}`,postInputs)
      const data = response.data
      console.log(data)
      if(data.error){
        alert(data.error)
      }else{
        const {jwt,userName} = data
        localStorage.setItem("token",jwt)
        localStorage.setItem("userName",userName)
        setUser(true)
        navigate('/blogs')
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div  className='h-screen flex justify-center items-center flex-col'>
      <div className='flex flex-col justify-center max-w-lg mb-2'>
      <div className='text-3xl px-3 font-bold'>{type=="Sign in"?"Log into your account":"Create an account"}</div>
      <div className='text-lg px-3 text-center text-slate-400 mt-2'>{type=="Sign in"?"Don't have an account?":"Already have an account?"} <Link to={type=="Sign in"?'/signup':'/signin'} className='pl-1 underline'>{type=="Sign in"?"Signup":"Signin"}</Link></div>
      </div>
      <div className='flex flex-col mt-4 w-1/3'>
        {type=="Signup"? <LabelledInputs label='Name' placeholder='Enter your name' onChange={(e)=>setPostInputs({...postInputs,name:e.target.value})}/>:null}
        <LabelledInputs label='Email' placeholder='Enter your email' onChange={(e)=>setPostInputs({...postInputs,email:e.target.value})}/>
        <LabelledInputs label='Password' placeholder='Enter your password' type={'password'} onChange={(e)=>setPostInputs({...postInputs,password:e.target.value})}/>
      </div>  
      <button type="button" onClick={sendRequest} className="text-white mt-4 mb-20 w-1/3 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type}</button>
    </div>
  )
}

export default Auth


interface labeledInputs {
  label:string,
  placeholder:string,
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
  type?:string
}
export const LabelledInputs = ({label,placeholder,onChange,type}:labeledInputs) =>{
  return <div>
  <label className="block mb-2 text-sm font-bold text-gray-900 text-dark">{label}</label>
  <input onChange={onChange} type={type||"text"} className="bg-gray-50 border
   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
    focus:border-blue-500 block w-full p-2.5  mb-3" placeholder={placeholder} required />
</div>
}