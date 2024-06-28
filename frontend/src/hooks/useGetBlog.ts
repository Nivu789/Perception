import { useEffect, useState } from "react"
import axios from 'axios'
import { BASE_URL } from "../config/config"

export interface Blog {
    content:any,
    title:string,
    author:{
        name:string
    },
}

export const useGetBlog = ({id}:{id:string}) =>{
    const [loading,setLoading] = useState(true)
    const [isAuthor,setIsAuthor] = useState(false)
   const [blog,setBlog] = useState<Blog>()

   useEffect(()=>{
    axios.get(`${BASE_URL}/api/v1/blog/${id}`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })
    .then((response)=>{
        console.log(response.data)
        if(response.data.userId){
            setIsAuthor(true)
        }
        setBlog(response.data.blog)
    })
    setLoading(false)
   },[id])

   return {loading,blog,isAuthor}
}