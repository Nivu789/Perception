
import { Avatar } from './Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'

interface BlogCardType {
    authorName:string,
    publishedDate:string,
    title:string,
    content:any,
    id:string,
    image:string,
    createdAt:Date
}

const BlogCard = ({authorName,title,content,id,image,createdAt}:BlogCardType) => {
  
  const findContent = (content:[]) =>{
    console.log("content",content)
    let filtered:any = content.filter((item:any)=>(item.text.length>5))
    return <div>{filtered[0].text.slice(0,100)} ....</div>
  }

  return (
    <div className='w-full lg:p-5 mt-2 p-2 lg:w-1/2 flex flex-col justify-start rounded-md border-b-slate-300 border-b-2 border-1 border-r-slate-600 shadow-md'>
      <Link to={`/blog/${id}`}>
      <div className='grid grid-cols-3'>
        <div className='col-span-2'>
        <div className='flex items-center gap-2'>
          <div><Avatar name={authorName||"Anonymous"} size={10}/></div>
          <div>{authorName||"Anonymous"}</div><div>.</div>
          <div className='text-slate-400'>{moment(createdAt).format("MMM Do YYYY")}</div>
        </div>
        <div className='text-2xl font-bold lg:mt-3'>
          {title}
        </div>
        <div className='text-lg text-slate-500 lg:mt-2'>
          {findContent(content)}
        </div>
        <div className='pt-2'>
          {`${Math.ceil(content.length)/10} minute(s) read`}
        </div>
        </div>
        <div className=''>
          {image && <img src={image} alt="" className='h-full w-fit rounded-md'/>}
          </div>
        </div>
    </Link>
    </div>
  )
}

export default BlogCard

