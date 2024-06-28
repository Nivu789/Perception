import z from 'zod'

export const signupSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})

export const signinSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export const createBlogSchema = z.object({
    title:z.string(),
    content:z.any().optional()
})

export const uppdateBlogSchema = z.object({
    title:z.string().optional(),
    content:z.any().optional(),
    blogId:z.string()
})

export type SignupType = z.infer<typeof signupSchema>
export type SigninType = z.infer<typeof signinSchema>
export type CreateBlogType = z.infer<typeof createBlogSchema>
export type uppdateBlogType = z.infer<typeof uppdateBlogSchema>

