import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupSchema , signinSchema } from '@nived789/common'

const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
        JWT_SECRET:string
    }
}>()

userRouter.post('/signup',async(c)=>{
   try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 
  
    const body = await c.req.json()
    const {success} = signupSchema.safeParse(body)
    if(!success){
      return c.json({message:"Invalid data"})
    }
    
    const userExist = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })

    if(userExist){
      return c.json({error:"User with this email already exist"})
    }else{
      const user = await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name:body.name
        }
      })
      const token = await sign({id:user.id},c.env.JWT_SECRET)
      return c.json({jwt:token,userName:name})
    }
    
   
  } catch (error) {
    return c.json({error:error})
   }
    
  })
  
  userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const body = await c.req.json()

    const {success} = signinSchema.safeParse(body)
    
    if(!success){
      return c.json({error:"Invalid data"})
    }

    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
  
    if(!user){
      return c.json({error:"no such user exists"})
    }
  
    const token = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({jwt:token,userName:user.name})
  
  })


export default userRouter