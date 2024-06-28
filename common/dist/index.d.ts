import z from 'zod';
export declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content?: any;
}, {
    title: string;
    content?: any;
}>;
export declare const uppdateBlogSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodAny>;
    blogId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    blogId: string;
    title?: string | undefined;
    content?: any;
}, {
    blogId: string;
    title?: string | undefined;
    content?: any;
}>;
export type SignupType = z.infer<typeof signupSchema>;
export type SigninType = z.infer<typeof signinSchema>;
export type CreateBlogType = z.infer<typeof createBlogSchema>;
export type uppdateBlogType = z.infer<typeof uppdateBlogSchema>;
