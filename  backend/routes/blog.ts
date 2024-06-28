import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import {createBlogSchema,uppdateBlogSchema} from '@nived789/common'



const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>()

blogRouter.use('/*',async(c,next)=>{
  try {
    const headers = c.req.header("authorization") || ""
    const response = await verify(headers,c.env.JWT_SECRET)
    if(response && typeof response.id === 'string'){
        c.set("userId",response.id)
      await next()
    }else{
      return c.json({error:"unauthorized"})
    }
  } catch (error) {
    console.log(error)
  }
  })


blogRouter.post('/',async(c)=>{
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        const body = await c.req.json()
        const {success} = createBlogSchema.safeParse(body)

        if(!success){
          return c.json({error:"Invalid data"})
        }

        const userId = c.get("userId")
        const blog = await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:userId
            }
        })

        return c.json({blogId:blog.id})

    } catch (error) {
        return c.json({error:"something went wrong in creating blog"})
    }
  })
  
blogRouter.put('/',async(c)=>{
    try {
      const body = await c.req.json()
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const {success} = uppdateBlogSchema.safeParse(body)

    if(!success){
      return c.json({error:"Invalid data"})
    }

    await prisma.post.update({
      where:{
        id:body.blogId
      },
      data:{
        title:body.title,
        content:body.content
      }
    })

    return c.json({message:"Updated"})

    } catch (error) {
      console.log(error)
      return c.json({error:"Error in put route"})
    }
  })
  
  blogRouter.get('/bulk',async(c)=>{
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogPosts = await prisma.post.findMany({
      select:{
        title:true,
        content:true,
        id:true,
        author:{
          select:{
            name:true,
            id:true
          }
        }
      }
    })
    if(blogPosts){
        return c.json({blogs:blogPosts})
    }else{
      return c.json({})
    }

    } catch (error) {
      console.log(error
      )
    }
  })

  
blogRouter.get('/:id',async(c)=>{
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogId = c.req.param("id")
    const userId = c.get("userId")
    const blogPost = await prisma.post.findUnique({
      where:{
        id:blogId
      },
      select:{
        title:true,
        content:true,
        author:{
          select:{
            name:true,
            id:true
          }
        }
      }
    })
    if(blogPost){
      if(userId == blogPost.author.id){
        return c.json({blog:blogPost,userId})
      }else{
        return c.json({blog:blogPost})
      }
       
    }else{
      return c.json({message:"no such blog found"})
    }

    } catch (error) {
      console.log(error
      )
    }
  })

  blogRouter.get('/edit/:id',async(c)=>{
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogId = c.req.param("id")
    const blogPost = await prisma.post.findUnique({
      where:{
        id:blogId
      },
      select:{
        title:true,
        content:true
      }
    })
    if(blogPost){
      return c.json({blog:blogPost})
    }else{
      c.json({error:"Coudn't find any such blog post"})
    }
    } catch (error) {
      console.log(error)
    }
  })

  blogRouter.delete('/delete/:id',async(c)=>{
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogId = c.req.param("id")
    const deletePost = await prisma.post.delete({
      where:{
        id:blogId
      }
    })
    if(deletePost){
      return c.json({message:"Deleted Post"})
    }else{
      return c.json({error:"Failed to delete post"})
    }

    } catch (error) {
      console.log(error)
    }
  })


  export default blogRouter