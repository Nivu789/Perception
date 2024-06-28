import { useEffect, useState } from 'react'
import { Avatar } from './Avatar'
import { Blog } from '../hooks/useGetBlog'
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/config';

type BlogProps = {
    blog:Blog,
    isAuthor:boolean
}

const FullBlog = ({blog,isAuthor}:BlogProps) => {
    const navigate = useNavigate()
   const { id } = useParams()
   console.log(id)

    const [markup,setMarkup] = useState<string | null>(null)

    useEffect(() => {
        if (blog.content) {
            const markup = draftToHtml(blog.content);
            setMarkup(markup);
        }
    }, [blog.content]);

    function createMarkup(html:any) {
        console.log("html",html)
        return {
          __html: DOMPurify.sanitize(html)
        }
    }
    
    const handleEditBlog = () =>{
        navigate(`/blog/edit/${id}`)
    }

    const handleDeleteBlog = () =>{
        axios.delete(`${BASE_URL}/api/v1/blog/delete/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            },
        }).then((response)=>{
            if(response.data.message){
                navigate('/blogs')
            }
        })
    }

  return (
    <>
    <div className='grid grid-cols-12 px-20 w-full gap-6'>
        <div className='col-span-9 border-r-2 pt-8'>
                <div className='flex flex-col w-full items-center h-screen'>
                    <div className='text-4xl font-bold'>{blog?.title}</div>
                    <div className='text-xl mt-4' dangerouslySetInnerHTML={createMarkup(markup)}></div>
                </div>
        </div>
        <div className='col-span-3 pt-8'>
            <div className='text-2xl'>Author</div>
            <div className='flex items-center gap-2 mt-4'>
            <Avatar name={blog?.author?.name} size={10}/>
            
                <div className='flex flex-col'>
                    <div className='text-xl font-semibold'>{blog?.author?.name || "Anonymous"}</div>
                    {/* <div>Random text</div> */}
                </div>
            </div>
            {isAuthor && <div className='mt-4 lg:flex lg:gap-3 flex-col'>
                <button onClick={handleEditBlog} className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                Edit Post
            </button>
            <button onClick={handleDeleteBlog} className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                Delete Post
            </button></div>}
        </div>
    </div>
    </>
  )
}

export default FullBlog

