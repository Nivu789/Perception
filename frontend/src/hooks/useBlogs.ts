import { useEffect, useState } from "react"
import axios from 'axios'
import { BASE_URL } from "../config/config"

export const useBlogs = () =>{
   const [loading,setLoading] = useState(true)
   const [blogs,setBlogs] = useState([])

   useEffect(()=>{
    axios.get(`${BASE_URL}/api/v1/blog/bulk`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })
    .then((response)=>{
        console.log(response.data.blogs)
        setBlogs(response.data.blogs)
    })
    setLoading(false)
   },[])

   return {loading,blogs}
   
}