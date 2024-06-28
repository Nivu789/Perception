import { useGetBlog } from '../hooks/useGetBlog'
import { useParams } from 'react-router-dom'
import FullBlog from '../components/FullBlog';
import BlogLoading from '../components/BlogLoading';


const Blog = () => {
  const params = useParams();
  const id = params?.id || "";

  const {blog,loading,isAuthor} = useGetBlog({id})

  console.log(blog)
  if(loading || !blog){
    return <div><BlogLoading/></div>
  }

  return (
    <FullBlog blog={blog} isAuthor={isAuthor}/>
  )
}

export default Blog