
import BlogCard from '../components/BlogCard'

import { useBlogs } from '../hooks/useBlogs'
import BlogsLoading from '../components/BlogsLoading'

const Blogs = () => {

  const {blogs,loading} = useBlogs()

  console.log(blogs)
  if(loading && !blogs){
    console.log("fsffsfsf")
    return <div><BlogsLoading/><BlogsLoading/><BlogsLoading/><BlogsLoading/></div>
  }

  type Blog = {
    author:{
      name:string
    }
    title:string
    content:any,
    id:string,
    image:string,
    createdAt:Date
  }

  return (
    <>
    <div className='flex justify-center flex-col items-center px-5 py-2'>
      {blogs && blogs.map((blog:Blog)=>(
              <BlogCard key={blog.id} createdAt={blog.createdAt} id={blog.id} authorName={blog.author.name} publishedDate='22 Jun 2024' title={blog.title} content={blog.content?.blocks || ""}
                image={blog.content?.entityMap[0]?.data?.src || ""}     />
      ))}
    </div>
    </>
  )
}

export default Blogs