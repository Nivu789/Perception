import axios from "axios"
import { BASE_URL } from "../config/config"
import { useEffect, useState } from "react"
import { RawDraftContentState } from "draft-js"


export const useEditBlog = ({id}:{id:string}) =>{
    const [loading,setLoading] = useState(false)
    const [blog,setBlog] = useState<RawDraftContentState | any>(null)
    const [dbTitle,setdbTitle] = useState<string>("")

    useEffect(()=>{
        axios.get(`${BASE_URL}/api/v1/blog/edit/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then((response)=>{
            console.log(response.data.blog.content)
            setBlog(response.data.blog.content)
            setdbTitle(response.data.blog.title)
            setLoading(false)
        })
    },[])

    return {loading,blog,dbTitle}
}